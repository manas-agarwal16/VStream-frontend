import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideos, makeVideosEmpty } from "../store/features/videoSlice"; // Adjust path as

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
    if (hasMore && !loading) {
      console.log("here home");
      dispatch(getVideos({ page }));
      console.log("here home 2");
    }
    [dispatch, page, hasMore, loading];
  });

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasMore &&
      !loading
    ) {
      dispatch(getVideos({ page }));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      {/* <aside> */}
        <div className="md:ml-[180px] grid grid-cols-1 bg-[#1B1B1F] sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-h-screen p-4 border-2 border-black mt-1">
          {videos.map((video, index) => (
            <div key={index} className="relative w-full h-48">
              {" "}
              {/* Fixed height with larger width */}
              <video
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                controls
                src={video.videoFile}
              ></video>
            </div>
          ))}
        </div>

        {/* {loading && <p>Loading more videos...</p>}
      {!hasMore && <p>No more videos to load</p>} */}
      {/* </aside> */}
    </>
  );
};

export default Home;
