import React, { useContext, useState } from "react";
import { UserContext } from "../../Pages/SkeletonPage";
import {
  Edit3,
  Calendar,
  Users,
  UserPlus,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  Bookmark,
  Plus,
  FileText,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import RecommendedAccounts from "./RecommendedAccounts";
import EditProfile from "./EditProfile";
import SearchProfiles from "./SearchProfiles";

function ProfileSection() {
  const { user, setUser } = useContext(UserContext);
  const [selected, setSelected] = useState("Posts");
  const [editProfile, setEditProfile] = useState(false);

  return (
    <div className="flex gap-6 mb-15">
      {/* Main Profile Area */}
      <div className="flex-1">
        {editProfile && (
          <EditProfile
            editProfile={editProfile}
            setEditProfile={setEditProfile}
          />
        )}

        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-800/80"></div>
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6 -mt-12 relative">
            <div className="flex justify-between items-end mb-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 p-1 shadow-xl">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold text-white">
                    {user?.profilePicture !== ""
                      ? user?.profilePicture
                      : user?.username?.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setEditProfile(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-semibold rounded-xl transition-all duration-200"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Name & Username */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-white">{user?.displayName}</h1>
              <p className="text-gray-400">@{user?.username}</p>
            </div>

            {/* Bio */}
            {user?.bio && (
              <p className="text-gray-300 mb-4 leading-relaxed">{user.bio}</p>
            )}

            {/* Stats Row */}
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-gray-300 hover:text-amber-400 cursor-pointer transition-colors">
                <Users className="w-4 h-4" />
                <span className="font-semibold text-white">{user?.socials?.following || 0}</span>
                <span className="text-gray-400">Following</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 hover:text-amber-400 cursor-pointer transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="font-semibold text-white">{user?.socials?.followers || 0}</span>
                <span className="text-gray-400">Followers</span>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>
                Joined{" "}
                {user?.createdAt &&
                  new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
              </span>
            </div>
          </div>
        </div>

        {/* Watchlist CTA */}
        {(!user?.watchList || user?.watchList?.length === 0) && (
          <div className="mt-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Create Your Watchlist</h3>
                  <p className="text-gray-400 text-sm">Start tracking your favorite cryptocurrencies</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-semibold rounded-xl transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700 w-fit">
            <button
              onClick={() => setSelected("Posts")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                selected === "Posts"
                  ? "bg-amber-500 text-slate-900"
                  : "text-gray-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <FileText className="w-4 h-4" />
              Posts
            </button>
            <button
              onClick={() => setSelected("Comments")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                selected === "Comments"
                  ? "bg-amber-500 text-slate-900"
                  : "text-gray-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              Comments
            </button>
          </div>
        </div>

        {/* Posts Section */}
        {selected === "Posts" && (
          <div className="mt-6">
            {user?.socials?.posts?.length > 0 ? (
              <div className="space-y-4">
                {user.socials.posts.map((post, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-5 hover:border-slate-600 transition-colors"
                  >
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-slate-900">
                          {user?.profilePicture !== ""
                            ? user?.profilePicture
                            : user?.username?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{user?.displayName}</h3>
                          <p className="text-gray-500 text-sm">@{user?.username} · 2h ago</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-200 mb-4 leading-relaxed">{post?.content}</p>

                    {/* Post Media Placeholder */}
                    {post?.media && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="aspect-video bg-slate-700/50 rounded-lg"></div>
                        <div className="aspect-video bg-slate-700/50 rounded-lg"></div>
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center gap-6 pt-3 border-t border-slate-700">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group">
                        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{post?.comments || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors group">
                        <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{post?.likes || 0}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors group">
                        <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group ml-auto">
                        <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-10 text-center">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Posts Yet</h3>
                <p className="text-gray-400 mb-6 max-w-sm mx-auto">
                  Share your thoughts, insights, and crypto journey with the community!
                </p>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-semibold rounded-xl transition-all duration-200">
                  <Plus className="w-4 h-4" />
                  Create Your First Post
                </button>
              </div>
            )}
          </div>
        )}

        {/* Comments Section */}
        {selected === "Comments" && (
          <div className="mt-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 p-10 text-center">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Comments Yet</h3>
              <p className="text-gray-400 max-w-sm mx-auto">
                Join the conversation! Your comments on other posts will appear here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <RecommendedAccounts />
    </div>
  );
}

export default ProfileSection;
