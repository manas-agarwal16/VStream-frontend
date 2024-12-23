import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import videoReducer from "./features/videoSlice";
import commentReducer from "./features/commentSlice";
import subscriptionReducer from "./features/subscriptionSlice";
import playlistReducer from "./features/playlistSlice";
import musicReducer from "./features/musicSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    video: videoReducer,
    comment: commentReducer,
    subscription: subscriptionReducer,
    playlist: playlistReducer,
    music: musicReducer,
  },
});

export default store;
