import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Logo, Input, Button } from "../index";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import { SlMenu, CiSearch, IoCloseCircleOutline } from "../icons";
import { logoutUser } from "../../store/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loginStatus } = useSelector((state) => state.auth);
  const location = useLocation(); // Use useLocation to get the current location
  const navigate = useNavigate(); // Use useNavigate for navigation

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  const searchVideos = async (data) => {
    console.log("search query ", data.search);
    navigate(`/search?${data.search.trim()}`);
  };

  const toggleSidebar = () => {
    console.log("hertetretrtertrt");

    setIsSidebarOpen(!isSidebarOpen);
  };

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
    toggleSidebar(); // Close sidebar after logout
  };

  return (
    <>
      <nav className="flex fixed justify-between items-center w-full px-4 bg-[#1a1a1d] text-white font-semibold z-50 h-16">
        {/* Logo */}
        <Logo height="50px" width="50px" className="ml-4 lg:ml-10" />

        {/* Search Form */}
        <form
          onSubmit={handleSubmit(searchVideos())}
          className="flex justify-between lg:justify-start lg:ml-[250px] items-center w-full relative left-14 md:left-16 lg:left-20"
        >
          <div className="flex w-4/5">
            <Input
              {...register("search", { required: true })}
              placeholder="Search..."
              className="bg-gray-800 text-white rounded-full px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring hover:ring-blue-400 transition"
            />
            <Button
              type="submit"
              bgColor="bg-pink-500 hover:bg-pink-600 transition shadow-lg"
              textColor="text-white"
              className="hidden lg:flex items-center justify-center px-3 py-2 ml-2 rounded-full"
            >
              <CiSearch className="text-white" size={24} />
            </Button>
          </div>
        </form>

        {/* Hamburger Icon */}
        <div
          onClick={toggleSidebar}
          className="lg:hidden border-2 border-red-500"
                  >
          <Button className="text-gray-300 hover:text-white bg-transparent transition duration-300">
            <SlMenu size={24} />
          </Button>
        </div>

        {/* Sidebar for Mobile */}
        {isSidebarOpen && (
          <div className="fixed top-0 right-0 w-3/5 h-full bg-gray-900 text-white z-20 shadow-lg p-5">
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
              onClick={toggleSidebar}
              aria-label="Close Menu"
            >
              <IoCloseCircleOutline className="text-white" size={30} />
            </button>
            <ul className="mt-12 space-y-4">
              {navItems.map(
                (item) =>
                  item.status && (
                    <li key={item.text}>
                      <Link
                        to={item.to}
                        className={`block font-semibold px-4 py-2 rounded-lg transition ${
                          location.pathname === item.to
                            ? "text-blue-400"
                            : "text-gray-300 hover:text-blue-400"
                        }`}
                        onClick={toggleSidebar}
                      >
                        {item.text}
                      </Link>
                    </li>
                  )
              )}
              {loginStatus && (
                <Button
                  text="Logout"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg w-full text-center transition"
                  onClick={handleLogout}
                />
              )}
            </ul>
          </div>
        )}

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          ></div>
        )}
      </nav>
      {/* Spacer to avoid content overlapping the navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
