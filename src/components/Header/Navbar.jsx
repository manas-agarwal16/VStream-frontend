import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Logo, Input, Button } from "../index";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SlMenu, CiSearch, IoCloseCircleOutline } from "../icons"; // Hamburger Icon
import { logoutUser } from "../../store/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.auth);

  // console.log("loginStatus : " , loginStatus);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchVideos = async (data) => {
    console.log("search query ", data.search);
    navigate(`/search?${data.search.trim()}`);
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
      <nav className="flex fixed justify-between items-center w-full px-3 bg-[#161618] text-white font-semibold z-50 h-60px">
        {/* Logo for small screens for bigger screens in sidebar */}
        <Logo height="60px" width="70px" className="mx-2 mt-2 md:ml-10 " />

        {/* Search form */}
        <form
          onSubmit={handleSubmit(searchVideos)}
          className="flex justify-between items-center w-[50%] relative md:left-8"
        >
          <Input
            {...register("search", { required: true })}
            placeholder="search"
            className="bg-gray-700 text-white  md:rounded-r-none focus:outline-none font-normal hover:border-[1px] hover:border-[#1c62b9]"
          />
          <Button
            type="submit"
            bgColor="bg-pink-300 bg-gradient-to-br from-pink-300 via-pink-400 to-blue-300 shadow-lg rounded-r-full rounded-l-lg"
            textColor="text-white"
            className="hidden md:block"
          >
            <CiSearch className="text-white" size={24} />
          </Button>
        </form>

        {/* Navigation items for larger screens */}
        <ul className="hidden md:flex justify-between items-center mx-3">
          {navItems.map((item) =>
            item.status ? (
              <li key={item.text}>
                <Link
                  to={item.to}
                  className={`font-semibold px-3 py-2 rounded-lg transition ${
                    location.pathname === item.to
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-blue-600"
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ) : null
          )}
          {loginStatus && <Button text="logout" onClick={handleLogout} />}
        </ul>

        {/* Hamburger icon for small screens */}
        <div className="md:hidden">
          <Button
            onClick={toggleSidebar}
            className="text-white"
            bgColor="bg-transparent"
          >
            <SlMenu size={24} />
          </Button>
        </div>

        {/* Sidebar for small screens */}
        {isSidebarOpen && (
          <div className="fixed top-0 right-0 w-2/5 h-full bg-black bg-opacity-80 text-white z-20 p-5">
            <button
              className="absolute top-4 right-4"
              onClick={toggleSidebar}
              aria-label="Close Menu"
            >
              <IoCloseCircleOutline className="text-white" size={30} />
            </button>
            <ul className="my-10">
              {navItems.map((item) =>
                item.status ? (
                  <li key={item.text} className="my-2">
                    <Link
                      to={item.to}
                      className={`block font-semibold px-3 py-2 rounded-lg transition ${
                        location.pathname === item.to
                          ? "text-pink-300"
                          : "text-gray-400 hover:text-blue-600"
                      }`}
                      onClick={toggleSidebar}
                    >
                      {item.text}
                    </Link>
                  </li>
                ) : null
              )}
              {loginStatus && <Button text="logout" onClick={handleLogout} />}
            </ul>
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
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
