import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../helper/axiosInstance";

export const uploadVideo = createAsyncThunk(async (data) => {
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
    console.log("video uploaded successfully: ", res.data);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in uploading video");
    throw error;
  }
});

export const watchVideo = createAsyncThunk(async (data) => {
  //video_id
  try {
    const res = await axiosInstance.get(`/videos/watch-video/${data.video_id}`);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in fetching video");
    throw error;
  }
});

export const deleteVideo = createAsyncThunk("delelteVideo", async (data) => {
  try {
    const res = await axiosInstance.delete("/delete-video", data);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in deleting video");
  }
});

export const updateVideoDetails = createAsyncThunk(
  "updateVideoDetails",
  async (data) => {
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
    }
  }
);

// export const getVideos = createAsyncThunk(async (data) => {
//   console.log("getVideos");
//   try {
//     const res = await axiosInstance.get(`/get-videos?page=${data.page}`);
//     console.log("pagination videos : ", res);
//     return res.data;
//   } catch (error) {
//     console.log("error in get videos" , error);
//     toast.error(error?.response?.data?.error || "Error in fetching videos");
//     throw error;
//   }
// });

export const getVideos = createAsyncThunk(
  "video/getVideos", // Action type
  async (data, { rejectWithValue }) => {
    
    // Payload creator function
    try {
      console.log("getVideos");
      const res = await axiosInstance.get(`/videos/get-videos?page=${data.page}`);
      console.log("paginated videos" , res.data);
      
      return res.data; // Return the response data (this will be the payload)
    } catch (error) {
      // Handle error and return a rejected value
      return rejectWithValue(error?.response?.data || "Error fetching videos");
    }
  }
);

export const search = createAsyncThunk("search", async (data) => {
  try {
    const res = await axiosInstance.get(`/videos/search?search=${data.search}`);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in fetching videos");
    throw error;
  }
});

const initialState = {
  loading: false,
  videoDetails: null,
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
    },
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(uploadVideo.pending, (state) => {
    //   state.loading = true;
    // })

    // .addCase(uploadVideo.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.videos = [...state.videos, action.payload.data.video];
    // })

    // .addCase(toggleVideoLike.pending, (state) => {
    //   state.loading = true;
    // })

    // .addCase(toggleVideoLike.fulfilled, (state, action) => {
    //   state.loading = false;
    // })
    builder
      .addCase(getVideos.pending, (state) => {
        state.loading = true;
      })

      .addCase(getVideos.fulfilled, (state, action) => {

        // console.log("action payload data videos : " , action.payload.data.videos);
        
        state.loading = false;
        state.videos = [...state.videos, ...action.payload.data.videos];
        if (action.payload.data.videos.length < 8) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
        state.page += 1;
      })
      .addCase(getVideos.rejected, (state, action) => {
        state.loading = false;
        console.log("Error in rejected action:", action.error.message);
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
        state.loading = false;
        state.videoDetails = action.payload.data;
      });
  },
});

export const { makeVideosEmpty } = videoSlice.actions;

export default videoSlice.reducer;
