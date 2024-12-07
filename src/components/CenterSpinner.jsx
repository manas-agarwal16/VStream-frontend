import React from "react";

function CenterSpinner({ width = 10 }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-[2px]">
      <div className={`w-${width} h-${width} border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin`}></div>
    </div>
  );
}

export default CenterSpinner;
