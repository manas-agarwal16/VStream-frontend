import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";
import { act } from "react";

export const likedVideos = createAsyncThunk(
  "liked-videos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("videos/liked-videos");
      // console.log("res.data : " , res.data);
      
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error fetching liked videos"
      );
      return rejectWithValue(
        error?.response?.data || "error in fetching liked videos"
      );
    }
  }
);


// export const toggleVideoLike = createAsyncThunk(
//   "toggleVideoLike",
//   async (data, { rejectWithValue }) => {
//     // console.log("toggleVideo video_id : ", data.video_id);
//     try {
//       const res = await axiosInstance.post(
//         `/videos/toggle-video-like/${data.video_id}`
//       );
//       console.log("res.data : ", res.data.data);

//       return res.data;
//     } catch (error) {
//       toast.error(
//         error?.data?.response?.error || "Error in toggling video like"
//       );
//       return rejectWithValue(
//         error?.response?.data || "error in toggle video likes"
//       );
//     }
//   }
// );

export const userProfile = createAsyncThunk(
  "userProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/users/user-profile/${data.username}`);
      // console.log("userProfile res : ", res);
      return res;
    } catch (error) {
      toast.error(
        error?.data?.response?.error || "error in fetching userprofile"
      );
      return rejectWithValue(
        error?.response?.data || "error in fetching userprofile"
      );
    }
  }
);

export const watchHistory = createAsyncThunk(
  "watchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/users/watch-history");
      return res.data;
    } catch (error) {
      toast.error(error?.data?.response?.error);
      return rejectWithValue(
        error?.response?.data || "error in fetching watchHistory"
      );
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "updateAvatar",
  async (data, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar);
    try {
      const res = await axiosInstance.patch("/users/update-avatar", formData);
      toast.success("Avatar updated successfully");
      return res;
    } catch (error) {
      toast.error(error?.data?.response?.error);
      return rejectWithValue(
        error?.response?.data || "error in fetching userprofile"
      );
    }
  }
);

const initialState = {
  loading: false,
  userProfileDetails: null, //fullName, username, description, avatar, coverImage , totalVideos uploadedVideos (myVideos cover ho jayega) , mostViewedVideos , subscribers , subscribing , is subscribing the current channel.
  watchHistory: [],
  likedVideos: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(watchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(watchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.watchHistory = action.payload;
      });
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfileDetails = action.payload.userProfileDetails;
      });
    builder
      .addCase(likedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(likedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.likedVideos = action.payload.data;
      });

    
  },
});

export default userSlice.reducer;
