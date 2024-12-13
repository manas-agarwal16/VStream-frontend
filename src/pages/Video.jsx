import React, { useEffect, useState } from "react";
import {
  Video as VideoComp,
  Navbar,
  Comment as CommentComp,
  VideoDescription,
  Sidebar,
} from "../components";
import { useParams } from "react-router-dom";
import {
  makeVideoDetailsEmpty,
  watchVideo,
} from "../store/features/videoSlice";
import { getComments, makeCommentsEmpty } from "../store/features/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import sidebarBackGround from "../assets/sidebarBackGround.jpg";
const Video = () => {
  const dispatch = useDispatch();
  const { video_id } = useParams();

  const { loading } = useSelector((state) => state.video);

  const {
    title,
    description,
    username,
    likes,
    views,
    isLiked,
    isSubscribed,
    subscribers,
    videoFile,
    avatar,
    createdAt,
  } = useSelector((state) => state.video.videoDetails);

  useEffect(() => {
    console.log("1");

    if (video_id) {
      dispatch(getComments({ video_id }));
      dispatch(watchVideo({ video_id }));
    }
    return () => {
      dispatch(makeVideoDetailsEmpty());
      dispatch(makeCommentsEmpty());
    };
  }, [video_id]);


  return loading ? (
    <h1> loading </h1>
  ) : (
    <div
      // style={{
      //   backgroundImage: `url(${sidebarBackGround})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   // backdropFilter: "blur(5px)",
      // }}
      className="bg-[transparent]"
    >
      <Navbar />
      <Sidebar />
      <div className="flex lg:w-2/3 w-full lg:mx-[230px] flex-col items-center justify-center">
        <VideoComp src={videoFile} poster={avatar} />
        <VideoDescription
          title={title}
          description={description}
          username={username}
          avatar={avatar}
          subscribers={subscribers}
          isSubscribed={isSubscribed}
          isLiked={isLiked}
          likes={likes}
          views={views}
          createdAt={createdAt}
          video_id={video_id}
        />
        <CommentComp video_id={video_id} />
      </div>
    </div>
  );
};

export default Video;
