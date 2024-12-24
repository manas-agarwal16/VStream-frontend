import React, { useEffect } from "react";
import { axiosInstance } from "../../helper/axiosInstance";

const PremiumSuccess = () => {

  useEffect(() => {
    console.log("premium success");
    
    const capturePayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const orderID = urlParams.get("orderID"); // Get orderID from the URL (PayPal redirects here)

      if (!orderID) {
        alert("Payment failed: No order ID found in the URL!");
        console.error("No order ID found in the URL.");
        return;
      }

      try {
        const response = await axiosInstance.post(
          "/users/premium/capture-order", // Ensure this points to your backend API
          { orderID }
        );

        if (response.status === 200) {
          alert("Payment successful!");
          console.log("Capture Details:", response.data.captureDetails);
        } else {
          alert("Payment failed!");
          console.log("Error:", response.data.error);
        }
      } catch (error) {
        console.error("Error capturing PayPal payment:", error);
        alert(
          "An error occurred while capturing the payment. Please try again."
        );
      }
    };

    capturePayment();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="flex justify-center items-center min-h-[80vh] lg:ml-[220px]">
      <div className="p-10 w-3/4 min-h-[30vh] rounded-lg bg-gradient-to-r from-orange-300 to-orange-400 gap-4 text-black flex flex-col justify-between text-lg shadow-lg shadow-orange-200 font-medium">
        <div className="text-center">
          Congratulations! You are now a premium user. Enjoy downloading videos.
        </div>
      </div>
    </div>
  );
};

export default PremiumSuccess;
