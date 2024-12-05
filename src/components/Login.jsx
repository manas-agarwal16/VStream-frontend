import React from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Logo } from "./index.js";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../store/features/authSlice.js";

const Login = () => {
//   console.log("here");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    console.log(data);
    dispatch(loginUser(data));
    navigate('/');
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center text-white">
      <div className="w-[550px] h-3/4">
        <div className="flex items-center justify-center">
          <Logo width="50px" height="50px" />
          <h1 className="font-bold text-xl m-4">LOGIN</h1>
        </div>
        <form
          onSubmit={handleSubmit(login)}
          className="w-full h-full flex flex-col justify-evenly border-2 border-gray-500 p-4"
        >
          <div>
            <Input
              {...register("username", {
                required: true,
              })} //handleSubmit will pass data with this field
              label="Email Address: "
              placeholder="email or username"
              type="text"
              className="w-80 placeholder:text-center caret-white px-10 py-2 my-2 border 
              text-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-[#1b1b1f]"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div>
            <Input
              {...register("password", {
                required: true,
              })}
              label="Password"
              type="password"
              placeholder="password"
              className="
        caret-white placeholder:text-center  py-2 my-2 border text-white w-80 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-[#1b1b1f]"
              name="password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              bgColor="bg-"
              className="btn-primary w-96 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              text="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

// <div
//   className="flex justify-evenly
// items-center flex-col text-white h-screen"
// >
//   <div className="flex flex-col justify-center items-center">
//     <div className="flex p-4 items-center justify-between">
//       <Logo width="50px" height="50px" />
//       <h1 className="text-3xl font-bold mt-3 text-center m-3">LOGIN</h1>
//     </div>
//     <form
//       className="border-gray-400 border-2 w-96 h-96 py-10 flex flex-col justify-evenly items-center text-white"
//       onSubmit={handleSubmit(login)} //handleSubmit automatically passes data of each input field
//     >
//       <div className="">
//         <Input
//           {...register("email", {
//             required: true,
//           })} //handleSubmit will pass data with this field
//           label="Email Address: "
//           placeholder="email or password"
//           type="email"
//           className="w-80 placeholder:text-center caret-white px-10 py-2 my-2 border
//           text-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-[#1b1b1f]"
//         />
//         {errors.email && <p className="error">{errors.email.message}</p>}
//       </div>
//       <div>
//         <Input
//           {...register("password", {
//             required: true,
//           })}
//           label="Password"
//           type="password"
//           placeholder="password"
//           className="
//         caret-white placeholder:text-center  py-2 my-2 border text-white w-80 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-[#1b1b1f]"
//           name="password"
//         />
//         {errors.password && <p>{errors.password.message}</p>}
//       </div>
//       <div className="text-center">
//         <Button
//           type="submit"
//           bgColor="bg-"
//           className="btn-primary w-80 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           text="Login"
//         />
//       </div>
//     </form>
//   </div>
// </div>

export default Login;
