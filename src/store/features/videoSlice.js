import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../helper/axiosInstance";

export const uploadVideo = createAsyncThunk(
  async (data, { rejectWithValue }) => {
    const formData = new FormData();
    // title, description, videoTag
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoTag", data.videoTag);
    formData.append("videoFile", data.videoFile);
    formData.append("thumbnail", data.thumbnail);
    try {
      const res = await axiosInstance.post("/videos/upload-video", formData);
      toast.success("Video Uploaded Successfully!!!");
      // console.log("video uploaded successfully: ", res.data);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error in uploading video");
      return rejectWithValue(
        error?.response?.data || "Error in uploading video"
      );
    }
  }
);

export const getVideos = createAsyncThunk(
  "video/getVideos", // Action type
  async (data, { rejectWithValue }) => {
    try {
      console.log("getVideos");
      const res = await axiosInstance.get(
        `/videos/get-videos?page=${data.page}`
      );
      console.log("paginated videos", res.data);

      return res.data; // Return the response data (this will be the payload)
    } catch (error) {
      // Handle error and return a rejected value
      toast.error(error?.response?.data?.error || "Error in fetching video");
      return rejectWithValue(error?.response?.data || "Error fetching videos");
    }
  }
);

export const watchVideo = createAsyncThunk(
  "watchVideo",
  async (data, { rejectWithValue }) => {
    //video_id

    try {
      // console.log("here 10000");
      const res = await axiosInstance.get(
        `/videos/watch-video/${data.video_id}`
      );
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error in fetching video");
      return rejectWithValue(
        error?.response?.data || "Error in watching videos"
      );
    }
  }
);

export const deleteVideo = createAsyncThunk(
  "delelteVideo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete("/delete-video", data);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error in deleting video");
      return rejectWithValue(
        error?.response?.data || "Error in deleting videos"
      );
    }
  }
);

export const updateVideoDetails = createAsyncThunk(
  "updateVideoDetails",
  async (data, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desciption", data.description);
    formData.append("videoTag", data.videoTag);
    formData.append("videoFile", data.videoFile);
    formData.append("thumbnail", data.thumbnail);
    try {
      const res = await axiosInstance.patch(
        `/videos/update-video-details`,
        formData
      );
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error in updating video details"
      );
      return rejectWithValue(
        error?.response?.data || "Error in watching videos"
      );
    }
  }
);

export const toggleVideoLike = createAsyncThunk(
  "toggleVideoLike",
  async (data, { rejectWithValue }) => {
    console.log("toggleVideo video_id : ", data.video_id);
    try {
      const res = await axiosInstance.post(`/videos/toggle-video-like`, data);
      // console.log("res.data : ", res.data);

      return res.data;
    } catch (error) {
      toast.error(
        error?.data?.response?.error || "Error in toggling video like"
      );
      return rejectWithValue(
        error?.response?.data || "error in toggle video likes"
      );
    }
  }
);

export const search = createAsyncThunk(
  "search",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/videos/search?search=${data.search}`
      );
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error in searching videos");
      return rejectWithValue(
        error?.response?.data || "Error in searching videos"
      );
    }
  }
);

const initialState = {
  loading: false,
  videoDetails: {},
  videos: [],
  page: 1,
  hasMore: true,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    makeVideosEmpty: (state) => {
      state.videos = [];
      state.page = 1;
    },
    makeVideoDetailsEmpty: (state) => {
      state.videoDetails = {};
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideos.pending, (state) => {
        state.loading = true;
      })

      .addCase(getVideos.fulfilled, (state, action) => {
        console.log("length : " , action.payload.data.videos.length);
        
        console.log("action payload data videos : " , action.payload.data.videos);

        state.loading = false;
        state.videos = [...state.videos, ...action.payload.data.videos];
        if (action.payload.data.videos.length < 6) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
        // state.page += 1;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        // console.log("Error in rejected action:", action.error.message);
        toast.error(action.error.message || "Failed to load videos");
      });

    builder
      .addCase(updateVideoDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVideoDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.map((video) =>
          video._id === action.payload.data._id ? action.payload.data : video
        );
      });

    builder
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter(
          (video) => video._id != action.payload.data._id
        );
      });

    builder
      .addCase(watchVideo.pending, (state) => {
        state.loading = true;
      })

      .addCase(watchVideo.fulfilled, (state, action) => {
        // console.log("videoSlice");

        state.loading = false;
        state.videoDetails = action.payload.data;
      })
      .addCase(watchVideo.rejected, (state, action) => {
        state.loading = false;
        console.log("Error in rejected action:", action.error.message);
        toast.error(action.error.message || "Failed to load videos");
      });
  },
});

export const { makeVideosEmpty, makeVideoDetailsEmpty, incrementPage } =
  videoSlice.actions;

export default videoSlice.reducer;
