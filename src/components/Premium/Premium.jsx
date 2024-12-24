import React from "react";
import { axiosInstance } from "../../helper/axiosInstance";
import { useSelector } from "react-redux";
import { Button } from "../index";
import { useNavigate } from "react-router-dom";


const Premium = () => {
  const { loading, loginStatus, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Send the request to create the PayPal order
      const response = await axiosInstance.post("users/premium/create-order");

      console.log("Response:", response);

      const orderID = response.data.id;
      console.log("orderID:", orderID);

      if (response.status === 201) {
        console.log("status aya hai 201");

        let approvalUrl = "";
        for (let link of response.data.links) {
          if (link.rel === "approve") {
            approvalUrl = link.href;
            break;
          }
        }
        console.log("approvalUrl:", approvalUrl);
        
        window.open(approvalUrl, "_blank"); // Redirect to PayPal for approval
      } else {
        alert("Failed to create PayPal order!");
        console.log("Error:", response.data.error);
      }
    } catch (error) {
      console.error("Error creating PayPal order:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[80vh] p-4 mt-8 lg:ml-[220px]">
        <div className="p-10 w-3/4 rounded-lg h-full bg-gradient-to-r gap-4 from-orange-200  to-orange-400 text-black flex flex-col justify-between text-lg shadow-md shadow-orange-100 font-medium">
          <h2 className="text-orange-400 relative text-center text-5xl lg:text-6xl font-serif">
            Premium 🎉
          </h2>
          <div className="text-3xl font-sans">"Unlock Premium Access! 🎥🩷</div>
          <div className="text-2xl italic">
            Get the ability to download your favorite videos for just{" "}
            <strong>₹101</strong>. Enjoy unlimited convenience and offline
            viewing with a one-time upgrade. Upgrade to Premium now!"
          </div>
          <div className="text-black my-4 text-4xl">
            ₹101/<span className="text-sm text-gray-800">lifetime</span>
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
                className="w-1/2 mx-auto hover:scale-105 transform transition duration-300 rounded-lg py-2 bg-black text-white"
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
