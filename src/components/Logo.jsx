import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = ({ width = "100px", height = "100px", className = "" }) => {
  return (
    <Link to={`/`}>
      <div className="flex flex-col lg:flex-row justify-center  items-center">
        <img
          className={`inline-block relative right-1 mb-2 w-[${width}] h-[${height}] object-cover ${className}`}
          src={logo}
          alt="Logo"
        />
        <p className="font-sans text-center lg:text-2xl text-[#56a3df]">VStream</p>
      </div>
    </Link>
  );
};

export default Logo;
