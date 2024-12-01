import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";



export const likedVideos = createAsyncThunk("liked-videos", async () => {
  try {
    const res = await axiosInstance.get("/liked-videos");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error fetching liked videos");
  }
});

export const myVideos = createAsyncThunk("my-videos", async () => {
  try {
    const res = await axiosInstance.get("/my-videos");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error fetching my videos");
  }
});

export const toggleVideoLike = createAsyncThunk(async (data) => {
  try {
    const res = await axiosInstance.post(
      `/videos/toggle-video-like/${data.video_id}`
    );
    return res.data;
  } catch (error) {
    toast.error(error?.data?.response?.error || "Error in toggling video like");
    throw error;
  }
});

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

export const updateAvatar = createAsyncThunk("updateAvatar" , async (data) => {
  const formData = new FormData();
  formData.append("avatar" , data.avatar);
  try {
      const res = await axiosInstance.patch("/users/update-avatar" , formData);
      toast.success("Avatar updated successfully");
      return res;
  } catch (error) {
      toast.error(error?.data?.response?.error);
  }
});

const initialState = {
  loading: true,
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

      builder
      .addCase(toggleVideoLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleVideoLike.fulfilled, (state, action) => {
        state.loading = false;
        const { video_id, userLiked } = action.payload.data;

        if (userLiked) {
          // Adding the video to likedVideos if not already present
          if (!state.likedVideos.some((video) => video._id === video_id)) {
            state.likedVideos.push({ _id: video_id });
          }
        } else {
          // Removing the video from likedVideos if user unliked it
          state.likedVideos = state.likedVideos.filter(
            (video) => video._id !== video_id
          );
        }
      });
  },
});

export default userSlice.reducer;
