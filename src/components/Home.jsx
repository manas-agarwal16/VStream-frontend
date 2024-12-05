import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideos, makeVideosEmpty , incrementPage } from "../store/features/videoSlice"; // Adjust path as
import { VideoList } from "./index";

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
    if (hasMore && !loading && page) {
      dispatch(getVideos({ page }));
    }
  } , []);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      dispatch(getVideos({ page : page + 1 }));
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
      <div className="md:ml-[180px] grid grid-cols-1 bg-[#1B1B1F] sm:grid-cols-2 gap-4  min-h-screen object-contain p-4 border-2 border-black mt-1 text-gray-500">
        {videos.map((video, index) => (
          <div
            key={index}
            className="w-full mx-2 h-72 bg-[#24242a] rounded-lg"
          >
            {" "}
            {/* Fixed height with larger width */}
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
        {loading && <p>Loading videos...</p>}
        {!hasMore && <p>No more videos to load</p>}
      </div>

      {/* </aside> */}
    </>
  );
};

export default Home;
