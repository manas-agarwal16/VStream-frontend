import { useState, useEffect } from "react";
import { Navbar, Sidebar, Home } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/features/authSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginStatus, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, navigate]);

  // console.log("loginStatus in main : ", loginStatus);
  // console.log("userData in main : " , userData);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
