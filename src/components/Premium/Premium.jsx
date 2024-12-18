import React from "react";
import { axiosInstance } from "../../helper/axiosInstance";
import { useSelector } from "react-redux";
import { Button } from "../index";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const { loading, loginStatus, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePayment = async () => {
    const { data } = await axiosInstance.post("/create-order", {
      amount: 500,
      currency: "INR",
    });
    const { order } = data;

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key_id
      amount: order.amount,
      currency: order.currency,
      name: "Premium Membership",
      description: "Upgrade to premium membership",
      order_id: order.id,
      handler: async (response) => {
        const verifyData = {
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
          userId: user.userId, // Pass the user's ID to the backend
        };

        const verifyResponse = await axios.post("/verify-payment", verifyData);

        if (verifyResponse.data.success) {
          alert(
            `Payment successful! Welcome, ${user.name}, to premium membership.`
          );
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: user.name, // Dynamically set the user's name
        email: user.email, // Dynamically set the user's email
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <>
        
      <div className="flex justify-center items-center min-h-[80vh]  lg:ml-[220px]">
        <div className="p-10 w-3/4 min-h-[30vh] rounded-lg bg-gradient-to-r from-orange-300 to-orange-400 gap-4 text-black flex flex-col justify-between text-lg shadow-lg shadow-orange-200 font-medium">
          <div className="text-center">
            By going premium at just <strong>₹11</strong> , you can download
            videos and enjoy them offline at your convenience
          </div>
          <div className="text-black my-4 text-4xl">
            ₹11/<span className="text-sm">lifetime</span>
          </div>
          {!loginStatus ? (
            <div className="flex flex-col justify-center items-center gap-2 font-normal">
              Login to go premium and enjoy our features
              <Button
                text="Login"
                bgColor="bg-black"
                onClick={() => navigate("/login")}
              />
            </div>
          ) : (
            <>
              <button
                onClick={handlePayment}
                className="w-full hover:scale-105 transform transition duration-300 rounded-lg py-2 bg-black text-white"
              >
                Pay Now
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Premium;
