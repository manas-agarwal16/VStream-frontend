import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo, CenterSpinner } from "./index.js";
import { useNavigate , useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../store/features/authSlice.js";
import { Link } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  

  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    console.log(data);
    const res = await dispatch(loginUser(data));
    console.log("in here barbie res : ", res);
    reset();
    if (res?.payload?.data) {
      navigate("/");
    }
  };

  return (
    <>
      {loading && <CenterSpinner />}
      <div className="min-w-screen min-h-screen flex justify-center items-center bg-gray-900">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <Logo width="60px" height="60px" />
            <h1 className="font-bold text-xl text-white m-4">LOGIN</h1>
          </div>
          <form
            onSubmit={handleSubmit(login)}
            className="w-full h-full flex flex-col justify-evenly p-6"
          >
            {/* Email Address */}
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Email Address
              </label>
              <input
                {...register("email", { required: true })}
                id="username"
                type="text"
                placeholder="email or username"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                id="password"
                type="password"
                placeholder="password"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <p className="text-white">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-500 underline hover:text-blue-400 transition duration-200"
                >
                  Create One
                </Link>{" "}
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center mt-6">
              <Button
                type="submit"
                bgColor="bg-blue-600  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
