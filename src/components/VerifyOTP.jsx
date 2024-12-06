import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, resendOTP, verifyOTP } from "../store/features/authSlice";
import { useForm } from "react-hook-form";
import { Logo, Button, Input } from "./index";

const VerifyOTP = () => {
  const { register, handleSubmit } = useForm();
  const { email } = useParams();
  console.log("email : ", email);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResendOTP = () => {
    dispatch(resendOTP({ email }));
  };

  const verify = async (data) => {
    console.log("data : ", data);
    const res = await dispatch(verifyOTP({ email, OTP: data.OTP }));
    console.log("verify OTP : ", res);

    if (res.payload.success === true) {
      dispatch(
        loginUser({ email: res.payload.email, password: res.payload.password })
      );
    } else {
      
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full mx-4 max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center">
            <Logo width="60px" height="60px" />
            <h2 className="text-2xl font-bold text-white text-center mb-6 mx-4">
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
              type="submit"
              bgColor="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              className="w-full py-2 text-white font-semibold rounded-md"
            >
              Verify OTP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
