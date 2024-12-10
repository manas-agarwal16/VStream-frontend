import React from "react";
import { Navbar, Sidebar, AllVideos as AllVideosComp } from "../components";
import { useParams } from "react-router-dom";
const AllVideos = () => {
    const {username} = useParams();
  return (
    <div>
      <Navbar />
      <Sidebar />
      <AllVideosComp username={username} />
    </div>
  );
};

export default AllVideos;
