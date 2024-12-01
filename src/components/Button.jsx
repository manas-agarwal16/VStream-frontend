import React from "react";

const Button = ({
  text = "submit",
  type = "submit",
  bgColor = "bg-pink-300 bg-gradient-to-br from-pink-300 via-pink-400 to-blue-300 shadow-lg",
  textColor = "text-white",
  className = "",
  children,  // Accept children (e.g., icon or text)
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 text-white rounded-lg transition-transform duration-200 ease-in-out hover:scale-105 ${className} ${textColor} ${bgColor}`}
      {...props}
    >
      {children || text}
    </button>
  );
};


export default Button;
