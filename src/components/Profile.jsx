import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { userProfile } from "../store/features/userSlice";

const Profile = () => {
  const { username } = useParams();

  const { loginStatus, loading, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (username != "guest") {
      const fetch = async () => {
        const res = await dispatch(userProfile({ username }));
        console.log("res?.payload : ", res?.payload);

        if (res?.payload != {}) {
          setProfile(res.payload);
        }
      };
      fetch();
    }
  }, [navigate]);

  return !loginStatus || !username ? (
    <div className="min-h-[80vh] object-contain w-full lg:w-[75vw] lg:ml-[220px] flex items-center justify-center mt-8 flex-col">
      <p className="text-white text-2xl my-8">Login to see your profile</p>
      <Button text="login" onClick={() => navigate("/login")} />
    </div>
  ) : (
    <>
      <div className="lg:ml-[230px] mt-8 text-white flex items-center border-2 border-red-500">
        <div>
          <img
            src={userData?.avatar}
            alt="avatar"
            className="w-40 h-40 mr-4 rounded-full"
          />
        </div>
        <div>
          <h1 className="text-4xl tracking-wide my-2 ">{userData?.fullName}</h1>
          <p>@{userData.username}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
