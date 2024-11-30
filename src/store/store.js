import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./features/authSlice"; 
import userReducer from "./features/userSlice";
import videoReducer from "./features/videoSlice";

const store = configureStore({
  reducer: {
    auth : authReducer,
    user : userReducer,
    video : videoReducer,
  }
});


export default store;