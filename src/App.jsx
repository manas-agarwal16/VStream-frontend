import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { loginStatus, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, navigate]);

  const location = useLocation();

  const backgroundColor = location.pathname.startsWith("/songs")
    ? "bg-blue-950"
    : "bg-[#070707]";

  return (
    <div className={`min-h-screen ${backgroundColor}`}>
      <Outlet />
    </div>
  );
}

export default App;
