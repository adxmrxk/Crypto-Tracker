import { useState, useContext } from "react";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ControlledSwitches from "../../Components/ControlledSwitches";
import Footer from "../../Components/Shared/Footer";
import LabelBottomNavigation from "../../Components/LabelBottomNavigation";
import { UserContext } from "../SkeletonPage";
import axios from "axios";

const NotificationsPage = () => {
  const { user, setUser } = useContext(UserContext);

  // Local state for notification toggles
  const [chatMessages, setChatMessages] = useState(true);
  const [mentionUsername, setMentionUsername] = useState(true);
  const [coinAlerts, setCoinAlerts] = useState(true);
  const [commentsOnPosts, setCommentsOnPosts] = useState(true);
  const [upvotesOnPosts, setUpvotesOnPosts] = useState(true);
  const [newFollowers, setNewFollowers] = useState(true);
  const [repliesToComments, setRepliesToComments] = useState(true);

  const handleTrendingCoinsChange = async (checked) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/settings/changeTrendingCoins/${user._id}`,
        { trendingCoins: checked },
      );
      setUser(res.data);
    } catch (error) {
      console.error("Failed to update trending coins setting");
    }
  };

  return (
    <div className="rounded-md w-[100%] h-auto relative top-4 p-3">
      <h1 className="font-roboto font-bold text-xl my-5 pl-9 text-sky-200">Messages</h1>
      <hr className="border-sky-400 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

      {/* Mention of username */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25 text-gray-100">
            Mention of username
          </h2>
          <div className="pr-24">
            <ControlledSwitches
              checked={mentionUsername}
              onChange={(checked) => setMentionUsername(checked)}
            />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-300">
          Get notified when someone mentions your username in a post or comment.
        </p>
      </div>

      <h1 className="font-roboto font-bold text-xl pl-9 my-5 text-sky-200">Market Trends</h1>
      <hr className="border-sky-400 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

      {/* Coin Alerts */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-10">
          <h2 className="font-roboto font-normal w-[60px] pl-25 whitespace-nowrap text-gray-100">
            Coin Alerts
          </h2>
          <div className="pr-24">
            <ControlledSwitches
              checked={coinAlerts}
              onChange={(checked) => setCoinAlerts(checked)}
            />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-5 text-gray-300">
          Receive alerts when coins in your watchlist hit price targets.
        </p>
      </div>

      {/* Trending Coins */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[60px] pl-25 whitespace-nowrap text-gray-100">
            Trending Coins
          </h2>
          <div className="flex items-center gap-[8px] mr-22 cursor-pointer group">
            <div className="mr-2">
              <ControlledSwitches
                checked={user?.settings?.trendingCoins ?? true}
                onChange={handleTrendingCoinsChange}
              />
            </div>
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-5 text-gray-300">
          Get notified about trending cryptocurrencies and market movements.
        </p>
      </div>

      <h1 className="font-roboto font-bold text-xl pl-9 my-5 text-sky-200">Activity</h1>
      <hr className="border-sky-400 my-1 w-[80%] mx-auto mask-x-from-0.5"></hr>

      {/* Comments on posts */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25 text-gray-100">
            Comments on posts
          </h2>
          <div className="pr-24">
            <ControlledSwitches
              checked={commentsOnPosts}
              onChange={(checked) => setCommentsOnPosts(checked)}
            />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-300">
          Get notified when someone comments on your posts.
        </p>
      </div>

      {/* Upvotes on posts */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25 text-gray-100">
            Upvotes on posts
          </h2>
          <div className="pr-24">
            <ControlledSwitches
              checked={upvotesOnPosts}
              onChange={(checked) => setUpvotesOnPosts(checked)}
            />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-300">
          Get notified when your posts receive upvotes.
        </p>
      </div>

      {/* New followers */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25 text-gray-100">
            New followers
          </h2>
          <div className="pr-24">
            <ControlledSwitches
              checked={newFollowers}
              onChange={(checked) => setNewFollowers(checked)}
            />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-300">
          Get notified when someone follows you.
        </p>
      </div>

      {/* Replies to comments */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-5 mt-8">
          <h2 className="font-roboto font-normal w-[380px] text-left ml-25 text-gray-100">
            Replies to comments
          </h2>
          <div className="pr-24">
            <ControlledSwitches
              checked={repliesToComments}
              onChange={(checked) => setRepliesToComments(checked)}
            />
          </div>
        </div>
        <p className="font-roboto text-sm w-fit ml-30 -mt-6 text-gray-300">
          Get notified when someone replies to your comments.
        </p>
      </div>

      <Footer />
      <LabelBottomNavigation />
    </div>
  );
};

export default NotificationsPage;
