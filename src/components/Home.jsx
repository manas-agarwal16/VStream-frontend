import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getVideos,
  makeVideosEmpty,
  incrementPage,
  makeVideoDetailsEmpty,
} from "../store/features/videoSlice"; // Adjust path as
import { VideoList, Spinner } from "./index";

const Home = () => {
  const dispatch = useDispatch();

  // Extract necessary states
  const { videos, loading, page, hasMore } = useSelector(
    (state) => state.video
  );
  console.log("videos : ", videos);
  console.log("page : ", page);
  console.log("hasMore : ", hasMore);

  // Load videos on mount and subsequent scrolls
  useEffect(() => {
    dispatch(getVideos({ page: 1 }));
    return () => {
      dispatch(makeVideosEmpty());
      dispatch(makeVideoDetailsEmpty());
    };
  }, []);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      dispatch(getVideos({ page: page + 1 }));
      dispatch(incrementPage());
      // console.log("after increment page : " , page);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      {/* <aside> */}
      <div className="lg:ml-[220px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#070707] min-h-screen p-6 text-gray-300">
        {videos.map((video, index) => (
          <div
            key={index}
            className="w-full h-72 bg-[#202026] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <VideoList
              videoFile={video.videoFile}
              avatar={video.ownerDetails[0].avatar}
              username={video.username}
              views={video.views}
              thumbnail={video.thumbnail}
              title={video.title}
              video_id={video._id}
            />
          </div>
        ))}

        {loading && (
          <div className="flex justify-center items-center col-span-full">
            <Spinner width={8} />
          </div>
        )}

        {!hasMore && (
          <p className="text-center col-span-full border-[1px] border-gray-600 w-full mt-6">
            {/* No more videos to load */}
          </p>
        )}
      </div>

      {/* </aside> */}
    </>
  );
};

export default Home;
