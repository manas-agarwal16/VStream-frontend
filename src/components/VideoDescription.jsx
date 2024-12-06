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

  return (
    <>
      <section className="w-full text-white sm:p-5 p-2 space-y-2">
        <div className="border-b border-slate-700">
          <div className="space-y-2 mb-2">
            {/* <h1 className="sm:text-2xl font-semibold">{title}</h1> */}
            <div className="flex items-center justify-between sm:justify-start sm:gap-5">
              <div>
                <span className="text-sm text-slate-400">{views} views . </span>
                <span className="text-sm text-slate-400">
                  {time(createdAt)}
                </span>
              </div>
              <div className=" rounded-full w-24 flex justify-center bg-[#222222] py-1">
                <LikeBtn
                  isLiked={isLiked}
                  video_id={video_id}
                  likesCount={likes}
                  size={25}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <Link to={`/channel/${username}/videos`} className="flex gap-2">
                <img
                  src={avatar}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h1 className="font-semibold">{username}</h1>
                  <p className="text-xs text-slate-400">
                    {localSubscribers} Subscribers
                  </p>
                </div>
              </Link>
              <div onClick={handleSubscribe}>
                <Button className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500">
                  {localIsSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <h1 className="my-6 font-bold text-xl">{title}</h1>
        <p className="text-sm bg-[#222222] rounded-lg p-2 outline-none max-h-64 overflow-auto">
          {description}
        </p>
      </section>
    </>
  );
};

export default VideoDescription;
