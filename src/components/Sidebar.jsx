import React from "react";
import {
  MdHome,
  BiHistory,
  HiOutlineVideoCamera,
  BiLike,
  HiOutlineUser,
  HiOutlineBookOpen,
} from "./icons";
import { FaMusic } from "react-icons/fa";
import sidebarBackGround from "../assets/sidebarBackGround.jpg";
import { Logo, Button } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/features/authSlice";

const Sidebar = () => {
  const { loginStatus, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sideComp = [
    {
      text: "Home",
      to: "/",
      children: <MdHome size={20} />,
    },
    {
      text: "History",
      to: "/history",
      children: <BiHistory size={20} />,
    },
    {
      text: "Liked Videos",
      to: "/liked-videos",
      children: <BiLike size={20} />,
    },
    {
      text: "Subscriptions",
      to: `/subscriptions/${userData._id || "guest"}`,
      children: <HiOutlineUser size={20} />,
    },
    // {
    //   text: "Playlists",
    //   to: "/playlists",
    //   children: <HiOutlineBookOpen size={20} />,
    // },
    {
      text: "Music Mode",
      to: "/songs",
      onHover: "text-gray-800",
      bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white",
      children: <FaMusic />,
    },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      {/* <hr /> */}
      <aside className="hidden lg:flex flex-col justify-between items-start p-4 py-8 fixed left-0 w-[220px] h-[90vh] overflow-y-auto">
        {/* <Logo width="50px" height="50px"/> */}
        <div className="flex flex-col space-y-3 w-full">
          {sideComp.map((comp) => (
            <Link
              to={comp.to}
              key={comp.text}
              className={`flex items-center w-full p-3 text-white rounded-lg transition duration-300 hover:${
                comp.onHover || "bg-gray-800"
              } hover:shadow-md ${
                location.pathname === comp.to
                  ? `${comp.onHover || "bg-gray-700"} text-blue-400`
                  : "text-gray-300"
              } ${comp.bgColor ? comp.bgColor : ''}`}
            >
              {/* Icon */}
              <div className="mr-3 text-lg">{comp.children}</div>
              {/* Text */}
              <span className="font-medium">{comp.text}</span>
            </Link>
          ))}
        </div>

        {/* Logout Button (Optional, if needed for the sidebar) */}
        {loginStatus && (
          <div className="w-full">
            <Button
              onClick={handleLogout}
              className="w-full text-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-md"
              text="Logout"
            />
          </div>
        )}
        {!loginStatus && (
          <>
            <div className="w-full">
              <Button
                onClick={() => navigate("/login")}
                className="w-full text-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition shadow-md mt-14 mb-4"
                text="Login"
              />
              <Button
                onClick={() => navigate("/register")}
                className="w-full text-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition shadow-md"
                text="Register"
              />
            </div>
            <div className="w-full"></div>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
