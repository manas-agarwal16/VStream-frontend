import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo, CenterSpinner } from "./index.js";
import { useNavigate, useLocation } from "react-router-dom";
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
    reset();
    if (res?.payload?.data) {
      navigate("/");
    }
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
        <div className="bg-gray-900 p-8 border-2 border-black rounded-lg shadow-mdz text-white max-w-xl w-full">
          <div className="flex items-center justify-center">
            {/* <Logo width="55px" height="55px" /> */}
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
              Login
            </h2>
          </div>
          <form onSubmit={handleSubmit(login)}>
            {/* Email Address */}
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Email or Username
              </label>
              <input
                {...register("email", { required: true })}
                id="username"
                type="text"
                autoFocus
                placeholder="email or username"
                className="w-full p-2  bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
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
              <input
                {...register("password", { required: true })}
                id="password"
                type="password"
                placeholder="password"
                className="w-full p-2  bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex justify-between items-center mt-6">
              <Button
                type="submit"
                bgColor="bg-blue-600  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                className="w-full py-3 mr-10 md:mr-14 lg:mr-20 xl:mr-28  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </Button>
              <Link
                to={"/"}
                className="text-blue-500 w-72 underline text-end mt-1 block"
              >
                back to home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
