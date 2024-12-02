import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./index";
import { toggleSubscribe } from "../store/features/subscriptionSlice";
import { toggleVideoLike } from "../store/features/userSlice";
import { FaThumbsUp as FilledThumbsUp } from "react-icons/fa"; // Filled icon
import { FaRegThumbsUp as OutlineThumbsUp } from "react-icons/fa";
import { watchVideo } from "../store/features/videoSlice";

const Video = () => {
  const dispatch = useDispatch();
  const { video_id } = useParams();
  console.log("video_id : ", video_id);
  const navigate = useNavigate();
  const { loginStatus } = useSelector((state) => state.auth);

  console.log("loginStatus", loginStatus);

  const { loading } = useSelector((state) => state.video);

  console.log("loading : ", loading);
  useEffect(() => {
    if (!loading) dispatch(watchVideo({ video_id }));
  }, [video_id]);

  const { videoDetails } = useSelector((state) => state.video);

  useEffect(() => {
    setDescription(videoDetails?._doc?.description);
    setTitle(videoDetails?._doc?.title);
    setVideoFile(videoDetails?._doc?.videoFile);
    setUsername(videoDetails?._doc?.username);
    setViews(videoDetails?._doc?.views);
    setAvatar(videoDetails?.avatar);
    setIsLiked(videoDetails?.isLiked);
    setIsSubscribed(videoDetails?.isSubscribed);
    setLikes(videoDetails?.likes);
    setSubscribers(videoDetails?.subscribers);
  }, [videoDetails]);

  console.log(videoDetails);

  const [description, setDescription] = useState(
    videoDetails?._doc.description
  );
  const [title, setTitle] = useState(videoDetails?._doc?.title);
  const [videoFile, setVideoFile] = useState(videoDetails?._doc?.videoFile);
  const [username, setUsername] = useState(videoDetails?._doc?.username);
  const [views, setViews] = useState(videoDetails?._doc?.views);
  const [avatar, setAvatar] = useState(videoDetails?.avatar);
  const [isLiked, setIsLiked] = useState(videoDetails?.isLiked);
  const [isSubscribed, setIsSubscribed] = useState(videoDetails?.isSubscribed);
  const [likes, setLikes] = useState(videoDetails?.likes);
  const [subscribers, setSubscribers] = useState(videoDetails?.subscribers);

  console.log(title, username, videoFile, avatar, likes);

  const handleChannelVisit = () => {};

  const handleSubscribe = () => {
    if (!loginStatus) {
      navigate("/login");
    } else {
      const res = dispatch(toggleSubscribe(username));
      setIsSubscribed(res);
      setSubscribers((prev) => {
        if (res) {
          return prev + 1;
        } else {
          return prev - 1;
        }
      });
    }
  };

  const handleLike = () => {
    console.log("in like button");

    if (!loginStatus) navigate("/login");
    const res = dispatch(toggleVideoLike(video_id));
    setIsLiked(res);
    setLikes((prev) => {
      if (res) {
        return prev + 1;
      } else {
        return prev - 1;
      }
    });
  };

  if (!videoDetails) return <>Loading...</>;

  return (
    <>
      {!loading ? (
        <div className="flex flex-col">
          <div className="w-full h-auto text-white font-medium flex flex-col md:flex-row justify-between p-2">
            {/* Video Section */}
            <video
              className="w-full md:w-[65%] rounded-lg mt-2 object-cover"
              autoPlay
              loop
              playsInline
              src={videoFile}
              controls
              // poster={avatar}
            ></video>
            <div className="flex flex-col p-4">
              <div className="font-bold text-xl mb-4 text-[#9499FF]">
                {title} Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Amet, repellat.
              </div>
              <div className="font-medium">
                {description} Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Dignissimos officiis consequuntur quos nulla
                vel fugit, commodi veniam a repudiandae voluptatem? Voluptates
                vel ducimus reiciendis cum dignissimos. Est quidem eos tempore!
              </div>
              <div className="hidden md:flex  text-blue-400  text-lg text-center items-center justify-center">
                {isLiked ? (
                  <FilledThumbsUp
                    className="m-2 cursor-pointer"
                    onClick={handleLike}
                    size={30}
                  />
                ) : (
                  <OutlineThumbsUp
                    className="m-2 cursor-pointer"
                    size={30}
                    onClick={handleLike}
                  />
                )}
                <div>{likes} likes</div>
              </div>
            </div>
          </div>
          <div>
            {/* large screen */}
            <div className="hidden md:flex text-blue-400 items-center px-2 w-full md:w-[65%] justify-evenly">
              <div
                className="flex items-center justify-start cursor-pointer"
                onClick={handleChannelVisit}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div className="font-bold text-2xl sm:text-xl">{username}</div>
              </div>
              {/* <div className="flex items-center"> */}
              <Button
                bgColor="bg-pink-200 text-black font-semibold p-3 mx-2 cursor-pointer"
                text={isSubscribed ? "Subscribed" : "Subscribe"}
                onClick={handleSubscribe}
              />
              <div className="mx-2 font-medium">Views : {views}</div>

              <div className="mx-2 font-medium">
                Subscribers : {subscribers}
              </div>
              {/* </div> */}
              {/* </div> */}
              <div className="flex md:hidden text-lg text-center items-center justify-center">
                {isLiked ? (
                  <FilledThumbsUp
                    className="m-2 cursor-pointer"
                    onClick={handleLike}
                    size={30}
                  />
                ) : (
                  <OutlineThumbsUp
                    className="m-2 cursor-pointer"
                    size={30}
                    onClick={handleLike}
                  />
                )}
                <div>{likes} likes</div>
              </div>
            </div>

            {/* small screen */}
            <div className="md:hidden flex text-blue-400 items-center px-2 w-full md:w-[65%] justify-between">
              <div
                className="flex items-center justify-start cursor-pointer"
                onClick={handleChannelVisit}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div className="font-bold text-2xl sm:text-xl">{username}</div>
              </div>
              {/* <div className="flex items-center"> */}

              {/* </div> */}
              {/* </div> */}
              <div className="flex md:hidden text-lg text-center items-center justify-center">
                {isLiked ? (
                  <FilledThumbsUp
                    className="m-2 cursor-pointer"
                    onClick={handleLike}
                    size={30}
                  />
                ) : (
                  <OutlineThumbsUp
                    className="m-2 cursor-pointer"
                    size={30}
                    onClick={handleLike}
                  />
                )}
                <div>{likes} likes</div>
              </div>
            </div>

            <div className="md:hidden w-full text-blue-400 flex items-center justify-between my-2 mt-4">
              <Button
                bgColor="bg-pink-200 text-black font-semibold p-3 mx-2 cursor-pointer"
                text={isSubscribed ? "Subscribed" : "Subscribe"}
                onClick={handleSubscribe}
              />
              <div className="mx-2 font-medium">Views : {views}</div>

              <div className="mx-2 font-medium">
                Subscribers : {subscribers}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Video;

// {/* Additional Details Section */}
{
  /* 
// </div> */
}
