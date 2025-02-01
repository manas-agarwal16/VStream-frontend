import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, resendOTP, verifyOTP } from "../store/features/authSlice";
import { useForm } from "react-hook-form";
import { Logo, Button, Input, CenterSpinner } from "./index";
import toast from "react-hot-toast";

const VerifyOTP = () => {
  const { loading } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm();
  const { email } = useParams();
  console.log("email : ", email);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResendOTP = () => {
    dispatch(resendOTP({ email }));
  };

  const verify = async (data) => {
    // console.log("data : ", data);
    const res = await dispatch(verifyOTP({ email, OTP: data.OTP }));
    console.log("verify OTP : ", res);

    if (res.payload.data.success === true) {
      dispatch(
        loginUser({
          email: res.payload.data.email,
          password: res.payload.data.password,
        })
      );
      navigate("/");
    } else {
      reset();
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
              OTP Verification
            </h2>
          </div>
          <form onSubmit={handleSubmit(verify)}>
            {/* OTP Input */}
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Enter the OTP sent to {email}
              </label>
              <Input
                {...register("OTP", { required: true })}
                type="text"
                id="otp"
                placeholder="Enter OTP"
                maxLength="6"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Resend OTP */}
            <div className="text-sm text-gray-400 mb-6">
              Didn’t receive the OTP?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline focus:outline-none"
                onClick={handleResendOTP}
              >
                Resend OTP
              </button>
            </div>

            {/* Submit Button */}
            <Button
              disabled={loading}
              type="submit"
              bgColor="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              className="w-full py-2 text-white font-semibold rounded-md"
            >
              Verify OTP
            </Button>
          </form>
        </div>
      </div>
      {/* </div> */}
      {/* // </div> */}
    </>
  );
};

export default VerifyOTP;
