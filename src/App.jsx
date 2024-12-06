import { useState, useEffect } from "react";
import { Navbar, Sidebar, Home } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { makeCommentsEmpty } from "./store/features/commentSlice.js";
import { makeVideoDetailsEmpty } from "./store/features/videoSlice.js";
import { makeVideosEmpty } from "./store/features/videoSlice.js";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // dispatch(makeCommentsEmpty());
  // dispatch(makeVideoDetailsEmpty());
  // dispatch(makeVideosEmpty());

  const { loginStatus, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
