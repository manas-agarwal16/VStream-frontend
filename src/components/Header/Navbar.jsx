import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Logo, Input, Button } from "../index";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { SlMenu, CiSearch, IoCloseCircleOutline } from "../icons"; // Hamburger Icon
import { logoutUser } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import sidebarBackGround from "../../assets/sidebarBackGround.jpg";
import { FaUserCircle } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";

import {
  MdHome,
  BiHistory,
  HiOutlineVideoCamera,
  BiLike,
  HiOutlineUser,
  HiOutlineBookOpen,
  FaVideo,
} from "../icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginStatus, userData } = useSelector((state) => state.auth);

  const [searchBarVisible, setSearchBarVisible] = useState(false);

  const avatarImage =
    userData?.avatar ||
    "https://cdn.pixabay.com/photo/2016/09/28/02/14/user-1699635_1280.png";

  const sideComp = [
    {
      text: "Profile",
      to: `/user-profile/${userData?.username || "guest"}`,
      children: <FaUserCircle size={20} />,
    },
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
      to: `/subscriptions/${userData._id || "guest"}"`,
      children: <HiOutlineUser size={20} />,
    },
    // {
    //   text: "Playlists",
    //   to: "/playlists",
    //   children: <HiOutlineBookOpen size={20} />,
    // },
    {
      text: "Upload Video",
      to: `/upload-video/${userData.username || "guest"}`,
      children: <FaVideo size={20} />,
    },
    {
      text: "Music Mode",
      to: "/songs",
      onHover: "text-gray-800",
      bgColor:
        "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white",
      children: <FaMusic />,
    },
  ];

  // console.log("loginStatus : " , loginStatus);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchVideos = async (data) => {
    // console.log("search query ", data.search);
    if (location.pathname.startsWith("/songs")) {
      navigate(`/songs/search/${data.search.trim()}`);
    } else {
      navigate(`/search?search=${data.search.trim()}`);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    {
      text: "Login",
      to: "/login",
      status: !loginStatus,
    },
    {
      text: "Register",
      to: "/register",
      status: !loginStatus,
    },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <nav
        className={`flex fixed justify-between items-center w-full px-4 ${
          location.pathname.startsWith("/songs")
            ? "bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800  "
            : "bg-[#070707] "
        }text-white font-semibold z-50 h-20`}
      >
        {/* Logo */}
        <Logo height="50px" width="50px" className="ml-4 lg:ml-10" />

        {/* Search bar for larger screens */}
        <form
          onSubmit={handleSubmit(searchVideos)}
          className="hidden lg:flex  justify-evenly items-center w-2/3"
        >
          <div className="flex justify-start items-center w-full lg:w-[70%] relative md:left-2 lg:left-32 mr-8">
            <div className="w-full mx-2">
              <Input
                {...register("search", { required: true })}
                placeholder={`${
                  location.pathname.startsWith("/songs")
                    ? "What you want to listen..."
                    : "Search..."
                }`}
                className={`${
                  location.pathname.startsWith("/songs")
                    ? "border-yellow-600 border-[3px] focus:outline-none bg-gray-400 font-normal text-white placeholder-gray-600"
                    : "bg-gray-800 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring hover:ring-blue-400 transition"
                }`}
              />
            </div>
            <Button
              type="submit"
              bgColor="bg-pink-500 hover:bg-pink-600 transition shadow-lg"
              textColor="text-white"
              className="hidden md:flex items-center justify-center px-3 py-2 ml-2 rounded-lg"
            >
              <CiSearch className="text-white" size={24} />
            </Button>
          </div>
        </form>

        {/* Small screen search icon */}
        <div className="lg:hidden flex items-center">
          <CiSearch
            size={24}
            className="cursor-pointer text-white"
            onClick={() => setSearchBarVisible((prev) => !prev)}
          />
        </div>

        {/* Collapsible Search Bar */}
        {searchBarVisible && (
          <div
            className={`fixed top-16 left-0 w-full ${
              location.pathname.startsWith("/songs")
                ? "bg-blue-950 "
                : "bg-[#070707] "
            } p-4 z-50`}
          >
            <form
              onSubmit={handleSubmit(searchVideos)}
              className="flex justify-between items-center"
            >
              <Input
                {...register("search", { required: true })}
                placeholder={`${
                  location.pathname.startsWith("/songs")
                    ? "What you want to listen..."
                    : "Search..."
                }`}
                className={`${
                  location.pathname.startsWith("/songs")
                    ? "border-yellow-600 border-[3px] focus:outline-none bg-gray-400 font-normal text-white placeholder-gray-600"
                    : "bg-gray-800 text-white rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring hover:ring-blue-400 transition"
                }`}
              />
              <Button
                type="submit"
                bgColor="bg-pink-500 hover:bg-pink-600 transition shadow-lg"
                textColor="text-white"
                className="ml-2 rounded-full px-4 py-2"
              >
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Other nav items */}
        <div className="items-center hidden lg:flex justify-center gap-4 lg:gap-8">
          <FaVideo
            size={30}
            className="cursor-pointer"
            onClick={() =>
              navigate(`/upload-video/${userData?.username || "guest"}`)
            }
          />
          <img
            onClick={() =>
              navigate(`/user-profile/${userData?.username || "guest"}`)
            }
            className="w-[50px] h-[50px] border-gray-500 border-2 rounded-full  cursor-pointer"
            src={avatarImage}
            alt="avatar"
          />
        </div>

        {/* Hamburger icon */}
        <div className="lg:hidden ml-4 flex items-center justify-center gap-4">
          <Button
            onClick={toggleSidebar}
            className="text-white"
            bgColor="bg-transparent"
          >
            <SlMenu size={24} />
          </Button>
        </div>

        {/* Sidebar and overlay (unchanged) */}
        {isSidebarOpen && (
          <div
            className={`fixed top-0 right-0 w-auto h-full ${
              location.pathname.startsWith("/songs")
                ? "bg-blue-950"
                : "bg-black"
            } text-white z-20 p-5 flex flex-col`}
            {...(!location.pathname.startsWith("/songs") && {
              style: {
                backgroundImage: `url(${sidebarBackGround})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              },
            })}
          >
            <button
              className="absolute top-4 right-4"
              onClick={toggleSidebar}
              aria-label="Close Menu"
            >
              <IoCloseCircleOutline className="text-white" size={30} />
            </button>

            <div className="flex flex-col space-y-3 w-full flex-grow mt-12">
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
                  } ${comp.bgColor ? comp.bgColor : ""}`}
                >
                  {/* Icon */}
                  <div className="mr-3 text-lg">{comp.children}</div>
                  {/* Text */}
                  <span className="font-medium">{comp.text}</span>
                </Link>
              ))}
            </div>

            {/* Logout Button */}
            {loginStatus && (
              <div className="w-full mt-auto">
                <Button
                  onClick={handleLogout}
                  className="w-full text-center self-end px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-md"
                  text="Logout"
                />
              </div>
            )}

            {/* Login and Register Buttons when not logged in */}
            {!loginStatus && (
              <div className="w-full mt-auto">
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
            )}
          </div>
        )}

        {/* Overlay for sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-[#161618] bg-opacity-50 z-10"
            onClick={toggleSidebar}
          ></div>
        )}
      </nav>
      <div className="pt-[64px]"></div>
    </>
  );
};

export default Navbar;
