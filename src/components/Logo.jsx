import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = ({ width = "100px" , height="100px" , className=""}) => {
  return (
    <Link to={`./`}>
      <img className={`inline-block w-[${width}] h-[${height}] object-cover ${className}`}   src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;
