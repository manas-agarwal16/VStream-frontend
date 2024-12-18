import React from "react";
import { Button, Input, Logo, CenterSpinner } from "./index";
import { useForm } from "react-hook-form";
import { registerUser } from "../store/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    console.log("register data : ", data);
    data.fullName = data.fullName
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
    const res = await dispatch(registerUser(data));
    console.log("res : ", res);

    if (res?.payload === true) {
      navigate(`/verify-otp/${data.email}`);
    }
  };

  const validateAvatar = (avatar) => {
    console.log("avatar : ", avatar);

    if (avatar[0]) {
      if (avatar[0].size > 1048576) {
        return "File size must be less than 1MB";
      }
      if (!avatar[0].type.includes("image")) {
        return "File must be an image";
      }
    }
    return true;
  };

  return (
    <>
      {loading && <CenterSpinner />}
      <div
      className="flex justify-center items-center min-h-screen mx-auto w-full px-4 pt-2 text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/8b/05/f3/8b05f3ae6c5568f2673d5007a8751e6f.jpg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
        <div className="bg-gray-900 p-8 border-2 border-black rounded-lg shadow-md text-white max-w-xl w-full">
          <div className="flex items-center justify-center">
            {/* <Logo width="55px" height="55px" /> */}
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
              Register
            </h2>
          </div>
          <form onSubmit={handleSubmit(handleRegister)}>
            {/* Full Name */}
            <div className="mb-5">
              <label
                htmlFor="full-name"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Full Name
              </label>
              <Input
                {...register("fullName", {
                  required: "Full Name is required.",
                })}
                autoFocus
                type="text"
                id="full-name"
                placeholder="Enter your name"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Email
              </label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Username
              </label>
              <Input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must not exceed 20 characters",
                  },
                  validate: (value) =>
                    !/\s/.test(value) || "Username cannot contain spaces",
                })}
                type="text"
                id="username"
                placeholder="Enter your email"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Password
              </label>
              <Input
                {...register("password", {
                  required: "Password is required", // Custom message for required
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters", // Custom message for minLength
                  },
                })}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* avatar */}
            <div className="mb-5">
              <label
                htmlFor="avatar"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Avatar (Optional)
              </label>
              <Input
                {...register("avatar", {
                  validate: validateAvatar,
                })}
                type="file"
                id="avatar"
                textColor="text-[#8e8e8e]"
                accept="image/*"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.avatar.message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <p className="text-white">
                Have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-500 underline hover:text-blue-400 transition duration-200"
                >
                  Login
                </Link>{" "}
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              bgColor="bg-blue-600  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              className="w-full py-2 text-white font-semibold rounded-md"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
