import React from "react";

function Video({ src, poster }) {
  return (
    <>
      <video
        src={src}
        poster={poster}
        autoPlay
        controls
        playsInline
        className="shadow-[0px_4px_10px_rgba(255,255,0,0.5)] h-2xl w-full block h-96 my-4 rounded-lg border-2 border-black object-cover mx-auto"
      ></video>
    </>
  );
}

export default Video;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "./index";
// import { toggleSubscribe } from "../store/features/subscriptionSlice";
// import { BiSolidLike as FilledThumbsUp } from "./icons"; // Filled icon
// import { FaThumbsUp as OutlineThumbsUp } from "react-icons/fa";
// import { watchVideo, toggleVideoLike } from "../store/features/videoSlice";

// const Video = () => {
//   const dispatch = useDispatch();
//   const { video_id } = useParams();
//   const navigate = useNavigate();

//   const { loginStatus } = useSelector((state) => state.auth);

//   // console.log("loginStatus", loginStatus);

//   const { loading, videoDetails } = useSelector((state) => state.video);

//   // console.log("loading : ", loading);
//   useEffect(() => {
//     if (!loading) dispatch(watchVideo({ video_id }));
//   }, [video_id]);

//   useEffect(() => {
//     setDescription(videoDetails?._doc?.description);
//     setTitle(videoDetails?._doc?.title);
//     setVideoFile(videoDetails?._doc?.videoFile);
//     setUsername(videoDetails?._doc?.username);
//     setViews(videoDetails?._doc?.views);
//     setAvatar(videoDetails?.avatar);
//     setIsLiked(videoDetails?.isLiked);
//     setIsSubscribed(videoDetails?.isSubscribed);
//     setLikes(videoDetails?.likes);
//     setSubscribers(videoDetails?.subscribers);
//   }, [videoDetails]);

//   // console.log(videoDetails);

//   const [description, setDescription] = useState(
//     videoDetails?._doc?.description
//   );
//   const [title, setTitle] = useState(videoDetails?._doc?.title);
//   const [videoFile, setVideoFile] = useState(videoDetails?._doc?.videoFile);
//   const [username, setUsername] = useState(videoDetails?._doc?.username);
//   const [views, setViews] = useState(videoDetails?._doc?.views);
//   const [avatar, setAvatar] = useState(videoDetails?.avatar);
//   const [isLiked, setIsLiked] = useState(videoDetails?.isLiked);
//   const [isSubscribed, setIsSubscribed] = useState(videoDetails?.isSubscribed);
//   const [likes, setLikes] = useState(videoDetails?.likes);
//   const [subscribers, setSubscribers] = useState(videoDetails?.subscribers);

//   console.log("videoDetails : ", videoDetails);
//   console.log("likes : ", likes);
//   console.log("isLiked : ", isLiked);

//   // console.log(title, username, videoFile, avatar, likes);

//   const handleChannelVisit = () => {};

//   const handleSubscribe = () => {
//     if (!loginStatus) {
//       navigate("/login");
//     } else {
//       const res = dispatch(toggleSubscribe(username));
//       setIsSubscribed(res);
//       setSubscribers((prev) => {
//         if (res) {
//           return prev + 1;
//         } else {
//           return prev - 1;
//         }
//       });
//     }
//   };

//   const handleLike = () => {
//     // console.log("in like button");

//     // console.log('loginStatus' , loginStatus);

//     if (!loginStatus) navigate("/login");
//     else {
//       const res = dispatch(toggleVideoLike({ video_id }));
//       console.log("res : ", res);

//       setIsLiked(res);
//       setLikes((prev) => {
//         if (res) {
//           return prev + 1;
//         } else {
//           return prev - 1;
//         }
//       });
//     }
//   };

//   if (!videoDetails) return <>Loading...</>;

//   return (
//     <>
//       {!loading ? (
//         <div className="flex flex-col">
//           <div className="w-full h-auto text-white font-medium flex flex-col lg:flex-row justify-between p-6">
//             {/* Video Section */}
//             {/* <div className="w-full lg:w-[65%] border-2 border-red-500"> */}
//             <video
//               className="w-full lg:w-4/6 h-full rounded-lg object-cover"
//               autoPlay
//               loop
//               playsInline
//               src={videoFile}
//               controls
//             ></video>
//             {/* </div> */}
//             <div className="flex flex-col p-4">
//               <div className="font-bold text-lg lg:text-xl mb-4 text-[#ECDFCC] max-h-[60px] scrollable scrollbar-hidden overflow-auto resize-none">
//                 {title} Lorem ipsum dolor sit amet consectetur, adipisicing
//                 elit. Amet, repellat.
//               </div>
//               <div className="font-medium max-h-[80px] lg:max-h-[50%] scrollable scrollbar-hidden overflow-auto">
//                 {description} Lorem ipsum dolor, sit amet consectetur
//                 adipisicing elit. Dignissimos officiis consequuntur quos nulla
//                 vel fugit, commodi veniam a repudiandae voluptatem? Voluptates
//                 vel ducimus reiciendis cum dignissimos. Est quidem eos tempore!
//               </div>
//               <div className="hidden lg:flex  text-blue-400  text-lg text-center items-center justify-center m-4">
//                 {isLiked ? (
//                   <div className="text-pink-300">
//                     {/* <h1>sndvbfnvbfd</h1> */}
//                     <FilledThumbsUp
//                       className="m-2 cursor-pointer"
//                       onClick={handleLike}
//                       size={30}
//                     />
//                   </div>
//                 ) : (
//                   <>
//                     {/* <h1>mananascadad</h1> */}
//                     <FilledThumbsUp
//                       className="m-2 cursor-pointer text-white"
//                       size={30}
//                       onClick={handleLike}
//                     />
//                   </>
//                 )}
//                 <div>{likes} likes</div>
//               </div>
//             </div>
//           </div>
//           <div>
//             {/* large screen */}
//             <div className="hidden lg:flex text-blue-400 items-center px-2 w-full lg:w-[65%] justify-evenly">
//               <div
//                 className="flex items-center justify-start cursor-pointer"
//                 onClick={handleChannelVisit}
//               >
//                 <img
//                   src={avatar}
//                   alt="avatar"
//                   className="w-14 h-14 rounded-full mr-4"
//                 />
//                 <div className="font-bold text-2xl sm:text-xl text-[#ECDFCC]">
//                   @{username}
//                 </div>
//               </div>
//               {/* <div className="flex items-center"> */}
//               <Button
//                 bgColor="bg-[#1E3E62] text-white font-semibold p-3 mx-2 cursor-pointer"
//                 text={isSubscribed ? "Subscribed" : "Subscribe"}
//                 onClick={handleSubscribe}
//               />
//               <div className="mx-2 font-medium">Views : {views}</div>

//               <div className="mx-2 font-medium">
//                 Subscribers : {subscribers}
//               </div>
//               {/* </div> */}
//               {/* </div> */}
//               <div className="flex lg:hidden text-lg text-center items-center justify-center">
//                 {isLiked ? (
//                   <div className="text-pink-300">
//                     {/* <h1>sndvbfnvbfd</h1> */}
//                     <FilledThumbsUp
//                       className="m-2 cursor-pointer"
//                       onClick={handleLike}
//                       size={30}
//                     />
//                   </div>
//                 ) : (
//                   <>
//                     {/* <h1>mananascadad</h1> */}
//                     <FilledThumbsUp
//                       className="m-2 cursor-pointer text-white"
//                       size={30}
//                       onClick={handleLike}
//                     />
//                   </>
//                 )}
//                 <div>{likes} likes</div>
//               </div>
//             </div>

//             {/* small screen */}
//             <div className="lg:hidden flex text-blue-400 items-center px-4 w-full lg:w-[65%] justify-between">
//               <div
//                 className="flex items-center justify-start cursor-pointer"
//                 onClick={handleChannelVisit}
//               >
//                 <img
//                   src={avatar}
//                   alt="avatar"
//                   className="w-14 h-14 rounded-full mr-2"
//                 />
//                 <div className="font-medium text-xl sm:text-xl text-gray-400">
//                   @{username}
//                 </div>
//               </div>
//               {/* <div className="flex items-center"> */}

//               {/* </div> */}
//               {/* </div> */}
//               <div className="flex lg:hidden text-lg text-center items-center justify-center">
//                 {isLiked ? (
//                   <div className="text-pink-300">
//                     {/* <h1>sndvbfnvbfd</h1> */}
//                     <FilledThumbsUp
//                       className="m-2 cursor-pointer"
//                       onClick={handleLike}
//                       size={30}
//                     />
//                   </div>
//                 ) : (
//                   <>
//                     {/* <h1>mananascadad</h1> */}
//                     <FilledThumbsUp
//                       className="m-2 cursor-pointer text-white"
//                       size={30}
//                       onClick={handleLike}
//                     />
//                   </>
//                 )}
//                 <div>{likes} likes</div>
//               </div>
//             </div>

//             <div className="lg:hidden w-full text-blue-400 flex items-center justify-between my-2 mt-4">
//               <Button
//                 bgColor="bg-[#1E3E62] text-white font-semibold p-3 mx-2 cursor-pointer"
//                 text={isSubscribed ? "Subscribed" : "Subscribe"}
//                 onClick={handleSubscribe}
//               />
//               <div>
//                 <div className="mx-2 font-medium ">Views : {views}</div>

//                 <div className="mx-2 font-medium">
//                   Subscribers : {subscribers}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <h1>Loading...</h1>
//       )}
//     </>
//   );
// };

// export default Video;

// // {/* Additional Details Section */}
// // {
//   /*
// // </div> */
// // }
