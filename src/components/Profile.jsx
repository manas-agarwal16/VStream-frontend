import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CenterSpinner, VideoList } from "./index";
import { useNavigate, useParams } from "react-router-dom";
import { userProfile } from "../store/features/userSlice";
import { Link } from "react-router-dom";
import { toggleSubscribe } from "../store/features/subscriptionSlice";
import axios from "axios";
import { axiosInstance } from "../helper/axiosInstance";
import toast from "react-hot-toast";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginStatus, loading, userData } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (username !== "guest") {
      const fetch = async () => {
        const res = await dispatch(userProfile({ username }));
        // console.log(
        //   "res?.payload?.data?.data?.channel : ",
        //   res?.payload?.data?.data?.channel
        // );

        if (res?.payload?.data?.data?.channel != {}) {
          setProfile(res?.payload?.data?.data?.channel);
        }
      };
      fetch();
    }
  }, [username]);

  const [localIsSubscribed, setLocalIsSubscribed] = useState(
    profile?.isSubsribed
  );
  const [localSubscribers, setLocalSubscribers] = useState(
    profile?.subscribers
  );

  const [localSubscribing, setLocalSubscribing] = useState(
    profile?.subscribing
  );

  let formattedName;

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile?.isSubscribed !== undefined) {
      setLocalIsSubscribed(profile?.isSubscribed);
      setLocalSubscribers(profile?.subscribers);
      setLocalSubscribing(profile?.subscribing);
      if (username === userData?.username) {
        setMessage(
          <>
            It seems like you haven't posted any videos yet. Once you upload
            your first video, it will appear here for others to view and engage
            with.{" "}
            <Link
              to={`/upload-video/${username}`}
              className="text-blue-500 p-3 font-normal underline"
            >
              Upload Video
            </Link>
          </>
        );
      } else {
        setMessage(<>{formattedName} has't posted anything yet.</>);
      }
    }
  }, [profile]);

  if (profile?.fullName) {
    formattedName = profile?.fullName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleSubscribe = () => {
    dispatch(toggleSubscribe({ username }));

    if (localIsSubscribed) {
      if (username === userData.username) {
        setLocalSubscribing((prev) => prev - 1);
      }
      setLocalSubscribers((prev) => prev - 1);
    } else {
      if (username === userData.username) {
        setLocalSubscribing((prev) => prev + 1);
      }
      setLocalSubscribers((prev) => prev + 1);
    }

    setLocalIsSubscribed((prev) => !prev);
  };

  const [profileLoading, setProfileLoading] = useState(false);

  const updateAvatar = async (e) => {
    // console.log("e.target.files: ", e.target.files);

    const avatar = e.target.files[0];
    console.log("avatar: ", avatar);

    const validImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!validImageTypes.includes(avatar.type)) {
      alert("Please select a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    const avatarAndPresetName = new FormData();
    avatarAndPresetName.append("file", avatar);
    avatarAndPresetName.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_PRESET_NAME
    );
    let data;
    try {
      setProfileLoading(true);
      data = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        avatarAndPresetName
      );
      console.log(
        "data after deploying avatar to cloudinary: ",
        data?.data?.secure_url
      );

      await axiosInstance.put(`/users/update-avatar/`, {
        avatarURL: data?.data?.secure_url,
        id: userData?._id,
      });

      setProfileLoading(false);
      toast.success(
        "Avatar updated successfully. Refresh the page to see changes.",
        {
          duration: 4000,
        }
      );
    } catch (error) {
      console.log("error deploying avatar to cloudinary: ", error);
    }
  };

  return !loginStatus || !username ? (
    <div className="min-h-[80vh] object-contain w-full lg:w-[75vw] lg:ml-[220px] flex items-center justify-center mt-8 flex-col">
      <p className="text-white text-2xl my-8">Login to see your profile</p>
      <Button text="login" onClick={() => navigate("/login")} />
    </div>
  ) : (
    <>
      {profileLoading && <CenterSpinner />}
      <div className="lg:ml-[230px] mt-8 text-white px-4 md:px-8">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-2 border-gray-500 border-opacity-5 p-4 bg-pink-50 bg-opacity-5 rounded-lg">
          <div className="relative flex items-center gap-4 lg:gap-8">
            {userData?.username === username && (
              <div className="absolute bottom-16 left-16 md:bottom-20 md:left-20 lg:bottom-36 lg:left-36">
                <label htmlFor="avatar" className="cursor-pointer">
                  &#9998;
                </label>
                <input
                  onChange={updateAvatar}
                  type="file"
                  id="avatar"
                  className="hidden"
                />
              </div>
            )}
            <div>
              <img
                src={profile?.avatar}
                alt="avatar"
                className="w-20 h-20 md:w-24 md:h-24 lg:w-40 lg:h-40 border-2 border-red-400 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl tracking-wide my-2 break-words">
                {formattedName}
              </h1>
              <p>@{username}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 lg:mt-0 justify-between items-center p-4">
            <span>Subscribers {localSubscribers}</span>
            <span>Subscribing {localSubscribing}</span>
            <div onClick={handleSubscribe}>
              <Button
                className="border-slate-500 hover:scale-105 transition-all font-semibold px-5 py-2 rounded-3xl shadow-lg"
                bgColor="bg-white"
                textColor={`${
                  localIsSubscribed ? "text-blue-500" : "text-slate-900"
                }`}
              >
                {localIsSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Videos Section */}
        <div>
          <h1 className="text-yellow-100 text-2xl md:text-4xl mt-8 mb-4 pl-2 md:pl-6">
            Recent Videos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#070707] p-4 md:p-6 text-gray-300 rounded-lg">
            {profile?.recentVideos?.map((video) => (
              <div
                key={video?._id}
                className="w-full h-72 bg-[#202026] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <VideoList
                  videoFile={video.videoFile}
                  avatar={profile?.avatar}
                  username={video.username}
                  views={video.views}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  video_id={video._id}
                />
              </div>
            ))}
          </div>
          {profile?.numberOfVideos > 3 && (
            <Link
              to={`/all-videos/${username}`}
              className="text-blue-500 ml-4 md:ml-8 relative bottom-4 underline"
            >
              View All Videos
            </Link>
          )}
          {profile?.recentVideos?.length === 0 && (
            <div className="min-h-44 flex items-center justify-center">
              <p className="text-center font-semibold text-lg h-full mx-6 md:mx-20">
                {message}
              </p>
            </div>
          )}
        </div>

        {/* Most Viewed Videos Section */}
        <div>
          <h1 className="text-yellow-100 text-2xl md:text-4xl mt-8 mb-4 pl-2 md:pl-6">
            Most Viewed Videos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#070707] p-4 md:p-6 text-gray-300 rounded-lg">
            {profile?.mostViewedVideos?.map((video) => (
              <div
                key={video?._id}
                className="w-full h-72 bg-[#202026] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <VideoList
                  videoFile={video.videoFile}
                  avatar={profile?.avatar}
                  username={video.username}
                  views={video.views}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  video_id={video._id}
                />
              </div>
            ))}
          </div>
          {profile?.mostViewedVideos?.length === 0 && (
            <div className="min-h-44 flex items-center justify-center">
              <p className="text-center font-semibold text-lg h-full mx-6 md:mx-20">
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
