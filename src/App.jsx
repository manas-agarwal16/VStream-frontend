import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, refreshAccessToken } from "./store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { loginStatus, userData } = useSelector((state) => state.auth);

  const fetchCurrentUser = useCallback(async () => {
    const res = await dispatch(getCurrentUser());
    console.log("get Current User response : ", res);
    if (!res.payload) {
      const refreshRes = await dispatch(refreshAccessToken());
      console.log("res.payload of refreshAccessToken : ", refreshRes);

      if (refreshRes.payload) {
        dispatch(getCurrentUser());
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

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
