import React from "react";
import { Home as HomeComp, Navbar, Sidebar } from "../components";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <HomeComp />
    </div>
  );
};

export default Home;
