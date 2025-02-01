import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, CenterSpinner } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../../store/features/videoSlice";

import { Link } from "react-router-dom";

function VideoUploadPage() {
  const { loading } = useSelector((state) => state.video);

  const navigate = useNavigate();

  const { loginStatus, userData } = useSelector((state) => state.auth);

  let username = userData?.username;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validateVideo = (video) => {
    console.log("video : ", video);
    if (video[0]) {
      if (video[0].size > 15 * 1024 * 1024) {
        return "File size must be less than 15MB";
      }
      if (!video[0].type.includes("video")) {
        return "File must be a video";
      }
    }
    return true;
  };

  const validateThumbnail = (thumbnail) => {
    console.log("thumbnail : ", thumbnail);
    if (thumbnail[0]) {
      if (thumbnail[0].size > 2 * 1024 * 1024) {
        return "File size must be less than 2MB";
      }
      if (!thumbnail[0].type.includes("image")) {
        return "File must be an image";
      }
    }
    return true;
  };

  const handleVideoUpload = async (data) => {
    console.log("video data : ", data);
    const res = await dispatch(uploadVideo(data));
    console.log("res : ", res);
    reset();
    if (res.payload) {
      console.log("Video uploaded successfully");
      navigate(`/user-profile/${username}`);
    }
  };

  useEffect(() => {
    if (!loginStatus) navigate("/login");
  }, []);

  return (
    <div
      className="flex justify-center items-center min-h-screen mx-auto w-full px-4 pt-2 text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/a0/2a/80/a02a80f8bfb75ddd6360670c8f104b4d.jpg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
      {loading && <CenterSpinner />}

      <div className="bg-gray-900 p-8 border-2 border-black rounded-lg shadow-md text-white max-w-xl w-full">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
          Upload Video
        </h2>
        <p className="mb-2 text-lg font-bold text-gray-400">
          Channel :{" "}
          <span className="inline-block italic text-pink-200">{username}</span>
        </p>

        <form onSubmit={handleSubmit(handleVideoUpload)}>
          {/* Video File */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Video File
            </label>
            <Input
              {...register("video", {
                validate: validateVideo,
                required: "Video is required",
              })}
              type="file"
              accept="video/*"
              textColor="text-[#8e8e8e]"
              className="w-full p-2  bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.video && (
              <p className="text-red-400 text-sm mt-2">
                {errors.video.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Thumbnail
            </label>
            <Input
              {...register("thumbnail", {
                validate: validateThumbnail,
                required: "Thumbnail is required",
              })}
              type="file"
              accept="image/*"
              textColor="text-[#8e8e8e]"
              className="w-full p-2 text-[#8e8e8e] bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.thumbnail && (
              <p className="text-red-400 text-sm mt-2">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Title
            </label>
            <Input
              {...register("title", {
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title must be at most 100 characters",
                },
                required: "Title is required",
              })}
              type="text"
              textColor="text-gray-300"
              placeholder="Enter the video title"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                minLength: {
                  value: 3,
                  message: "Description must be at least 3 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Description must be at most 500 characters",
                },
                required: "Description is required",
              })}
              placeholder="Enter a brief description of the video"
              className="w-full text-gray-300 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-400 text-sm mt-2">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white py-2 px-4 rounded-md font-medium"
          >
            Upload Video
          </button>
          <Link
            to={"/"}
            className="text-blue-500 underline text-end mt-1 inline-block w-full"
          >
            back to home
          </Link>
        </form>
      </div>
    </div>
  );
}

export default VideoUploadPage;
