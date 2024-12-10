import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchVideosBackend } from "../store/features/videoSlice";
import { useLocation } from "react-router-dom";
import { CenterSpinner, VideoList } from "./index";

const Search = () => {
  const location = useLocation();
  const myParams = new URLSearchParams(location.search);

  console.log("myParams : ", myParams);

  const search = myParams.get("search");
  console.log("search : ", search);

  const { searchVideos, loading } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  console.log("searchVideos : ", searchVideos);

  useEffect(() => {
    dispatch(searchVideosBackend({ search }));
  }, [search]);

  return loading ? (
    <>
      <CenterSpinner />
    </>
  ) : (
    <>
      {/* <aside> */}
      {searchVideos?.length > 0 && (
        <div className="lg:ml-[220px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#070707] min-h-screen p-6 text-gray-300">
          {searchVideos?.map((video) => (
            <div
              key={video._id}
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
          ))}
        </div>
      )}
      {searchVideos.length === 0 && (
        <>
          <div className="w-full h-[90vh] lg:ml-[220px] lg:w-[77vw] xl:w-[81vw] 2xl:w-[84vw] flex justify-center items-center">
            <p className="text-center text-white text-xl md:text-2xl">
              Sorry☹️, No results found for your search. Please try using
              different keywords or check your spelling.
            </p>
          </div>
        </>
      )}
      {/* </aside> */}
    </>
  );
};

export default Search;
