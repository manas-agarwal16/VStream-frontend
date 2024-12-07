import React from "react";

const Button = ({
  text = "submit",
  type = "submit",
  bgColor = "bg-blue-600  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
  textColor = "text-white",
  className = "",
  children, // Accept children (e.g., icon or text)
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
