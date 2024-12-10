import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { watchVideo } from "../store/features/videoSlice";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
const Video = ({
  avatar,
  videoFile,
  thumbnail,
  title,
  views,
  username,
  video_id,
}) => {
  //   ownerDetails = ownerDetails[0];
  // console.log("avatar : ", avatar);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch-video/${video_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col truncate object-contain text-white w-full h-full hover:cursor-pointer"
    >
      <img
        className="w-full h-44 object-cover rounded-lg rounded-b-none"
        src={thumbnail}
        alt="thumbail"
      />
      <div className="my-1">
        <span className="flex justify-start items-center">
          <img
            src={avatar}
            alt="avatar"
            id={username}
            className="w-8 h-8 rounded-full m-2 "
          />
          <div>{username}</div>
        </span>
        <span className="inline-block pl-3">{views} views</span>
        <div className="font-semibold px-3 overflow-hidden">{title}</div>
      </div>
    </div>
  );
};

export default Video;
