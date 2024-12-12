import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  incrementPage,
  comment,
  editComment,
  deleteComment,
  makeCommentsEmpty,
  toggleCommentLike,
} from "../store/features/commentSlice";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { FaThumbsUp as FilledThumbsUp } from "react-icons/fa"; // Filled icon
import { FaRegThumbsUp as OutlineThumbsUp } from "react-icons/fa";
import { Input, LikeBtn } from "./index";
import { useNavigate } from "react-router-dom";

const Comment = ({ video_id }) => {
  //currently only handling comments for videos

  // console.log("video_id : ", video_id);

  const dispatch = useDispatch();
  const { loginStatus, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // console.log("login : ", loginStatus);
  // console.log("userDetails : ", userData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { comments, totalComments, loading } = useSelector(
    (state) => state.comment
  );

  // console.log("comments : ", comments);

  const makeComment = (data) => {
    if (!loginStatus) {
      navigate("/login");
    }
    dispatch(comment({ content: data.comment, video_id: video_id }));
    reset();
  };

  const handleDelete = (comment_id) => {
    console.log("comment_id : ", comment_id);
    if (!loginStatus) {
      navigate("/login");
    }
    dispatch(deleteComment({ comment_id }));
  };

  const handleCommentLike = (comment) => {
    console.log("comment : ", comment);
    if (!loginStatus) {
      navigate("/login");
    }
    console.log("comment : " , comment);
    
    dispatch(toggleCommentLike({ comment }));
  };

  return (
    <>
      <div className="flex flex-col w-full justify-start items-evenly gap-3 p-4 text-white">
        <div className="text-white font-bold text-xl">
          {" "}
          {totalComments} Comments
        </div>
        <form
          onSubmit={handleSubmit(makeComment)}
          className="flex justify-between items-center"
        >
          <Input
            {...register("comment", { required: true })}
            className="bg-transparent focus:outline-none focus:ring-0 w-[80%] border-b-2 border-gray-600 mr-3 rounded-none placeholder:font-normal caret-white text-white font-normal"
            placeholder="Add a comment"
          />
          <Button
            text="Comment"
            className="ml-3 bg-[#346aa7] font-semibold hover:bg-[#3a5e87]"
            bgColor="bg-blue-500"
          />
        </form>
        <div className="">
          <ul>
            {comments.map((comment) => (
              <li key={comment._id} className="flex flex-col my-3 w-full">
                {/* avatar */}
                <div className="flex justify-between items-center">
                  <div
                    onClick={() =>
                      navigate(`/user-profile/${comment.username}`)
                    }
                    className="flex cursor-pointer justify-start items-start mr-2 my-1"
                  >
                    <img
                      src={comment.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <h3 className="font-semibold text-[#ECDFCC]">
                      @{comment.username}
                    </h3>
                  </div>
                  {loginStatus && userData?.username === comment.username ? (
                    <div className="flex justify-between items-center">
                      {/* <div
                      onClick={handleEdit}
                      className="text-blue-400 text-lg underline"
                    >
                      Edit
                    </div> */}
                      <div
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-400 cursor-pointer text-lg underline text-center mx-3 p-0"
                      >
                        Delete
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-col justify-evenly ml-14">
                  <div className="flex justify-between">
                    {/* is user login is ans username match*/}
                  </div>
                  {/* <p className="overflow-y-auto overflow-x-hidden max-h-[100px] my-1">
                  {comment.content}
                </p> */}
                  <textarea
                    onChange={(e) => {
                      handleEditing(e.target.value);
                    }}
                    value={comment.content}
                    type="text"
                    // ref={inputRef}
                    readOnly
                    className={`pointer-events-auto bg-transparent text-white scrollbar-hidden scrollable overflow-auto h-auto p-0 resize-none focus:outline-none focus:ring-0`}
                  />
                  <div className="flex justify-start items-center">
                    <span
                      onClick={() => handleCommentLike(comment)}
                      className="cursor-pointer"
                    >
                      {comment.isLiked ? (
                        <FilledThumbsUp size={20} />
                      ) : (
                        <OutlineThumbsUp size={20} />
                      )}
                    </span>
                    <span className="m-1">{comment.likes}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full h-[2px] px-4 bg-gray-500 mb-4"></div>
    </>
  );
};

export default Comment;