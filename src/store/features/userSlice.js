import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: true,
  userProfileDetails: null,
  watchHistory: [],
};

export const userProfile = createAsyncThunk("userProfile", async (username) => {
  try {
    const res = await axiosInstance.get(`/users/user-profile/${username}`);
    console.log("userProfile res : ", res);
    return res;
  } catch (error) {
    toast.error(error?.data?.response?.error);
  }
});

export const watchHistory = createAsyncThunk("watchHistory", async () => {
  try {
    const res = await axiosInstance.get("/users/watch-history");
    return res;
  } catch (error) {
    toast.error(error?.data?.response?.error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(watchHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(watchHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.watchHistory = action.payload;
    });
    builder.addCase(userProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfileDetails = action.payload.userProfileDetails;
    });
  },
});

export default userSlice.reducer;
