import React from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionList = ({
  username,
  avatar,
  subscribers,
  fullName,
  subscribing,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/user-profile/${username}`, { replace: true })}
      className="flex flex-col lg:flex-row justify-between my-4 items-center border-2 border-gray-500 border-opacity-5 p-1 bg-[#f6babad8] rounded-lg"
    >
      <div className="flex items-center gap-4 lg:gap-8">
        <div>
          <img
            src={avatar}
            alt="avatar"
            className="w-20 h-20 border-2 border-red-400 rounded-full"
          />
        </div>
        <div>
          <h1 className="lg:text-xl tracking-wide break-words">
            {fullName}
          </h1>
          <p className="font-semibold italic">@{username}</p>
        </div>
      </div>
      <div className="flex flex-col font-semibold text-lg md:flex-row gap-4 justify-between items-center text-gray-200">
        <span>Subscribers: <span className="text-white">{subscribers}</span></span>
        <span>Subscribing: <spann className="text-white">{subscribing}</spann></span>
      </div>
    </div>
  );
};

export default SubscriptionList;
