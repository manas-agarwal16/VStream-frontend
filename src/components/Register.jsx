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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    console.log("register data : ", data);
    data.email = data.email.toLowerCase();
    data.username = data.username.toLowerCase();
    data.fullName = data.fullName.toLowerCase();
    const res = await dispatch(registerUser(data));
    console.log("res : ", res);

    if (res?.payload === true) {
      navigate(`/verify-otp/${data.email}`);
    }
  };

  // return (
  //   <div className="bg-gray-900 min-h-screen flex justify-center items-center">
  //     <Spinner width={10} />
  //   </div>
  // );

  return (
    <>
      {loading && <CenterSpinner />}
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full mx-4 mt-4 max-w-md bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-center">
            <Logo width="55px" height="55px" />
            <h2 className="text-2xl font-bold text-white text-center mb-6 mx-4">
              Register
            </h2>
          </div>
          <form onSubmit={handleSubmit(handleRegister)}>
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Full Name
              </label>
              <Input
                {...register("fullName", {
                  required: "Full Name is required.",
                })}
                type="text"
                id="full-name"
                placeholder="Enter your name"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
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
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Username
              </label>
              <Input
                {...register("username", {
                  required: "Username is required", // Custom message for required
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters", // Custom message for minLength
                  },
                })}
                type="text"
                id="username"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-1"
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
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* avatar */}
            <div className="mb-4">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Avatar (Optional)
              </label>
              <input
                {...register("avatar")}
                type="file"
                id="avatar"
                accept="image/*"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

  return loading ? (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <Spinner width={10} />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full mx-4 mt-4 max-w-md bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-center">
          <Logo width="55px" height="55px" />
          <h2 className="text-2xl font-bold text-white text-center mb-6 mx-4">
            Register
          </h2>
        </div>
        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Full Name
            </label>
            <Input
              {...register("fullName", {
                required: "Full Name is required.",
              })}
              type="text"
              id="full-name"
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-1"
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
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Username
            </label>
            <Input
              {...register("username", {
                required: "Username is required", // Custom message for required
                minLength: {
                  value: 6,
                  message: "Username must be at least 6 characters", // Custom message for minLength
                },
              })}
              type="text"
              id="username"
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-1"
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
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* avatar */}
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Avatar (Optional)
            </label>
            <input
              {...register("avatar")}
              type="file"
              id="avatar"
              accept="image/*"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
  );
};

export default Register;
