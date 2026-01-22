import React, { useState, useEffect, useContext, useRef } from "react";
import { Bell, X, Check, Trash2, UserPlus, MessageSquare, ThumbsUp, AtSign, TrendingUp, AlertCircle } from "lucide-react";
import axios from "axios";
import { UserContext } from "../Pages/SkeletonPage";

const NotificationBell = () => {
  const { user } = useContext(UserContext);
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
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-slate-700/50 transition cursor-pointer"
      >
        <Bell size={24} className="text-gray-300 hover:text-white transition" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-xl shadow-2xl ring-1 ring-gray-600/50 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-600/50">
            <h3 className="text-white font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300 transition cursor-pointer"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="p-1 hover:bg-slate-600/50 rounded transition cursor-pointer"
                  title="Clear all"
                >
                  <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <p className="text-gray-400">Loading...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={32} className="mx-auto text-gray-500 mb-2" />
                <p className="text-gray-400">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => !notification.read && markAsRead(notification._id)}
                  className={`flex items-start gap-3 p-3 border-b border-gray-700/30 hover:bg-slate-600/30 transition cursor-pointer ${
                    !notification.read ? "bg-slate-600/20" : ""
                  }`}
                >
                  {/* Icon or Profile Picture */}
                  <div className="flex-shrink-0 mt-1">
                    {notification.fromProfilePicture ? (
                      <img
                        src={notification.fromProfilePicture}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium text-left">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-400 text-left truncate">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 text-left mt-1">
                      {formatTimeAgo(notification.createdAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                    <button
                      onClick={(e) => deleteNotification(notification._id, e)}
                      className="p-1 hover:bg-slate-500/50 rounded transition opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <X size={14} className="text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
