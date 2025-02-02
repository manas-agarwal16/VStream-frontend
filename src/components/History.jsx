import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, VideoList, Spinner } from "./index";
import { watchHistory } from "../store/features/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const History = () => {
  const { loginStatus, userData, loading } = useSelector((state) => state.auth);
  console.log("userData : ", userData);

  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const previousLocation = location.pathname;

  useEffect(() => {
    if (userData?.watchHistory) {
      const fetch = async () => {
        const res = await dispatch(watchHistory());
        console.log("res : ", res?.payload?.data);

        if (res?.payload?.data != []) {
          setVideos(res.payload.data);
        }
      };
      fetch();
    }
  }, [userData]);

  console.log("videos : ", videos);

  return !loginStatus ? (
    <>
      <div className="text-4xl lg:ml-[220px] p-6 text-white font-bold">
        Watch History
      </div>
      <div className="flex justify-center lg:ml-[220px] items-center min-h-[60vh]">
        <div className="flex flex-col justify-center items-center">
          <p className="text-white text-center text-2xl my-8 mx-auto p-4">
            Please log in to your account to access and view your watch history.
          </p>
          <Button text="Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="text-4xl lg:ml-[220px] p-6 text-white font-bold">
        Watch History
      </div>
      {videos?.length > 0 && (
        <div className="lg:ml-[220px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#070707] min-h-screen p-6 text-gray-300">
          {videos?.map((video) => {
            return (
              <div
                key={video?._id}
                className="w-full h-72 bg-[#202026] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <VideoList
                  videoFile={video?.videoFile}
                  avatar={video?.avatar}
                  username={video?.username}
                  views={video?.views}
                  thumbnail={video?.thumbnail}
                  title={video?.title}
                  video_id={video?._id}
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
      {videos?.length === 0 && (
        <div className="flex p-10 px-20 flex-col justify-center items-center w-full h-[65vh] lg:ml-[220px] lg:w-[77vw] xl:w-[81vw] 2xl:w-[85vw]  mx-auto">
          <p className="flex justify-center p-4 items-center text-white text-xl font-semibold  text-center">
            It looks like you haven't watched any videos yet. Once you start
            watching, your watch history will appear here. Feel free to explore
            our content and start watching to track your progress!
          </p>
          <Link to={"/"} className="text-blue-500 underline mx-4">
            Home
          </Link>
        </div>
      )}
    </>
  );
};

export default History;
