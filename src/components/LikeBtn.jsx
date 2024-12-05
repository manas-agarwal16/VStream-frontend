import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidLike } from "../components/icons";
// import {
//     toggleCommentLike,
//     toggleVideoLike,
// } from "../store/Slices/likeSlice";
import { toggleVideoLike } from "../store/features/videoSlice";
import { toggleCommentLike } from "../store/features/commentSlice";
import { useNavigate } from "react-router-dom";

function LikeBtn({ isLiked, likesCount = 0, comment_id, video_id, size }) {

  const {loginStatus} = useSelector(state => state.auth);
  const navigate = useNavigate();
  if(!loginStatus){
    navigate('/login');
  }

  // console.log("video_id : ", video_id);

  const dispatch = useDispatch();
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  const handleLikeToggle = () => {
    if (localIsLiked) {
      setLocalLikesCount(localLikesCount - 1);
    } else {
      setLocalLikesCount(localLikesCount + 1);
    }

    setLocalIsLiked((prev) => !prev);

    if (comment_id) {
      dispatch(toggleCommentLike({ comment_id }));
    }
    if (video_id) {
      dispatch(toggleVideoLike({ video_id }));
    }
  };
  // useEffect(() => {
  //   setLocalIsLiked(isLiked);
  //   setLocalLikesCount(likesCount);
  // }, [isLiked, likesCount]);

  return (
    <>
      <div className="flex items-center gap-1">
        <BiSolidLike
          size={size}
          onClick={handleLikeToggle}
          className={`cursor-pointer ${localIsLiked ? "text-purple-500" : ""}`}
        />
        <span className="text-xs mr-3">{localLikesCount}</span>
      </div>
    </>
  );
}

export default LikeBtn;
