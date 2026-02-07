import React, { useState, useEffect, useContext, useRef } from "react";
import ReactDOM from "react-dom";
import { Bell, X, Check, Trash2, UserPlus, MessageSquare, ThumbsUp, AtSign, TrendingUp, AlertCircle } from "lucide-react";
import axios from "axios";
import { UserContext } from "../Pages/SkeletonPage";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user?._id) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${user._id}`
      );
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/unread/${user._id}`
      );
      setUnreadCount(res.data.unreadCount);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  // Initial fetch and polling
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [user?._id]);

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark single notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/notifications/read/${notificationId}`
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    if (!user?._id) return;
    try {
      await axios.patch(
        `http://localhost:5000/api/notifications/readAll/${user._id}`
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(
        `http://localhost:5000/api/notifications/${notificationId}`
      );
      const deleted = notifications.find((n) => n._id === notificationId);
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
      if (deleted && !deleted.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // Handle notification click - mark as read and navigate
  const handleNotificationClick = async (notification) => {
    // Mark as read if unread
    if (!notification.read) {
      await markAsRead(notification._id);
    }

    // Close dropdown
    setIsOpen(false);

    // Navigate based on notification type
    switch (notification.type) {
      case "follow":
        // Navigate to the user's profile who followed you
        if (notification.fromUsername) {
          navigate(`/chatroom/${notification.fromUsername}`);
        }
        break;
      case "comment":
      case "upvote":
      case "mention":
        // Navigate to the chatroom/social area
        navigate("/chatroom");
        break;
      case "coin_alert":
      case "trending":
        // Navigate to explore page for coin-related notifications
        navigate("/explore");
        break;
      default:
        break;
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    if (!user?._id) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/notifications/all/${user._id}`
      );
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to clear notifications:", error);
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "follow":
        return <UserPlus size={18} className="text-blue-400" />;
      case "comment":
      case "reply":
        return <MessageSquare size={18} className="text-green-400" />;
      case "upvote":
        return <ThumbsUp size={18} className="text-yellow-400" />;
      case "mention":
        return <AtSign size={18} className="text-purple-400" />;
      case "coin_alert":
        return <AlertCircle size={18} className="text-red-400" />;
      case "trending":
        return <TrendingUp size={18} className="text-orange-400" />;
      default:
        return <Bell size={18} className="text-gray-400" />;
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-red-500/20 transition-all duration-300 cursor-pointer"
        title="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Modal Overlay - Using Portal to render outside DOM hierarchy */}
      {isOpen && ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-[9999] px-4 backdrop-blur-sm bg-black/60">
          <div ref={dropdownRef} className="relative bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-700 flex-shrink-0">
              <h3 className="text-xl font-bold text-white">Notifications</h3>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-amber-400 hover:text-amber-300 font-medium transition cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition cursor-pointer"
                    title="Clear all"
                  >
                    <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-12 text-center">
                  <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-400">Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell size={32} className="text-gray-500" />
                  </div>
                  <p className="text-white font-medium mb-1">No notifications yet</p>
                  <p className="text-gray-500 text-sm">We'll notify you when something happens</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-700/50">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`group flex items-start gap-4 p-5 hover:bg-slate-700/30 transition cursor-pointer ${
                        !notification.read ? "bg-slate-700/20" : ""
                      }`}
                    >
                      {/* Icon or Profile Picture */}
                      <div className="flex-shrink-0">
                        {notification.fromProfilePicture ? (
                          <img
                            src={notification.fromProfilePicture}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-base text-white font-medium text-left">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-400 text-left mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 text-left mt-2">
                          {formatTimeAgo(notification.createdAt)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                        )}
                        <button
                          onClick={(e) => deleteNotification(notification._id, e)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <X size={16} className="text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default NotificationBell;
