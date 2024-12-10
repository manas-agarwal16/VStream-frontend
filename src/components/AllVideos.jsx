import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, VideoList, Spinner } from "./index";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { allUserVideos } from "../store/features/videoSlice";

const AllVideos = (username) => {
  const { loginStatus, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { loading, userVideos } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(allUserVideos(username));
  }, [username]);

  //   const navigate = useNavigate();

  return (
    <>
      <div className="text-4xl lg:ml-[220px] p-6 text-white font-bold">
        All Videos By {userData.fullName}
      </div>
      {userVideos?.length > 0 && (
        <div className="lg:ml-[220px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#070707] min-h-screen p-6 text-gray-300">
          {userVideos?.map((video) => {
            return (
              <div
                key={video?._id}
                className="w-full h-72 bg-[#202026] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <VideoList
                  videoFile={video.videoFile}
                  avatar={video.avatar}
                  username={video.username}
                  views={video.views}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  video_id={video._id}
                />
              </div>
            );
          })}
          {loading && (
            <div className="flex justify-center items-center col-span-full">
              <Spinner width={8} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllVideos;
