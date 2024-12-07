import React, { useState } from "react";
import { time } from "../helper/time";
import { LikeBtn } from "./index";
import { useDispatch } from "react-redux";
import { toggleSubscribe } from "../store/features/subscriptionSlice";
import { Link } from "react-router-dom";
import { Button } from "./index";

const VideoDescription = ({
  title,
  description,
  subscribers,
  likes,
  isLiked,
  isSubscribed,
  video_id,
  views,
  username,
  avatar,
  createdAt,
}) => {
  const dispatch = useDispatch();

  // const [localIsLiked, setlocalIsLiked] = useState(isLiked);
  const [localIsSubscribed, setlocalIsSubscribed] = useState(isSubscribed);
  // const [localLikes, setlocalLikes] = useState(likes);
  const [localSubscribers, setlocalSubscribers] = useState(subscribers);

  const handleSubscribe = () => {
    dispatch(toggleSubscribe({ username }));

    if (localIsSubscribed) {
      setlocalSubscribers((prev) => prev - 1);
    } else {
      setlocalSubscribers((prev) => prev + 1);
    }

    setlocalIsSubscribed((prev) => !prev);
  };

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded((prevState) => !prevState);
  };

  return (
    <section className="w-full text-white sm:p-6 p-4 space-y-4">
      <div className="border-b border-slate-700 pb-4">
        <div className="space-y-4 mb-4">
          {/* Video Info Section */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-400">{views} views . </span>
              <span className="text-sm text-slate-400">{time(createdAt)}</span>
            </div>
            <div className="rounded-full w-24 flex justify-center bg-[#1a1919] py-2">
              <LikeBtn
                isLiked={isLiked}
                video_id={video_id}
                likesCount={likes}
                size={25}
              />
            </div>
          </div>
          {/* Channel Info Section */}
          <div className="flex gap-3 justify-between items-center">
            <Link to={`/channel/${username}/videos`} className="flex gap-3">
              <img
                src={avatar}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#222222]"
                alt="Channel Avatar"
              />
              <div>
                <h1 className="font-semibold italic text-lg">@{username}</h1>
                <p className="text-xs text-slate-400">
                  {localSubscribers} Subscribers
                </p>
              </div>
            </Link>
            <div onClick={handleSubscribe}>
              <Button
                className="border-slate-500 hover:scale-105 transition-all text-black font-semibold px-5 py-2  rounded-3xl shadow-lg"
                bgColor="bg-white"
                textColor={`${localIsSubscribed ? "text-blue-500" : "text-slate-900"}`}
              >
                {localIsSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Title */}
      <h1 className="my-6 font-extrabold text-2xl text-[#E5E5E5]">{title}</h1>

      {/* Video Description */}
      <div className="relative">
        <h1 className="font-bold tracking-wide text-lg">Description</h1>
        <p
          className={`text-sm bg-[#090909] rounded-lg p-4 outline-none max-h-64 overflow-auto text-slate-200 ${
            isDescriptionExpanded ? "h-auto" : "h-32 overflow-ellipsis"
          }`}
        >
          {description}
        </p>
        {!isDescriptionExpanded && { description }.length > 150 && (
          <button
            className="absolute bottom-4 right-4 text-sm text-blue-500 bg-transparent"
            onClick={toggleDescription}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoDescription;
