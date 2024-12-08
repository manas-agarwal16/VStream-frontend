import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Video,
  Home,
  Login,
  Register,
  VerifyOTP,
  History,
  LikedVideos,
  Profile,
} from "./pages";
import { Toaster } from "react-hot-toast"; // Import the Toaster

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "watch-video/:video_id",
        element: <Video />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-otp/:email",
        element: <VerifyOTP />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "liked-videos",
        element: <LikedVideos />,
      },
      {
        path: "user-profile/:username",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    {/* Add the Toaster here */}
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{
        error: {
          style: {
            borderRadius: "4px",
            backgroundColor: "#2c2c2c", // Dark background
            color: "#ff6b6b", // Professional error red
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Subtle shadow
          },
        },
        success: {
          style: {
            borderRadius: "4px",
            backgroundColor: "#2c2c2c", // Dark background
            color: "#4caf50", // Professional success green
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Subtle shadow
          },
        },
        duration: 1500, // Slightly longer duration for better visibility
      }}
    />
  </Provider>
);
