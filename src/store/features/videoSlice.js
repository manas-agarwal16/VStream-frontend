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

export const getVideos = createAsyncThunk(async (data) => {
  try {
    const res = await axiosInstance.get(`/get-videos?page=${data.page}`);
    console.log("pagination videos : ", res);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in fetching videos");
    throw error;
  }
});

export const search = createAsyncThunk("search", async (data) => {
  try {
    const res = await axiosInstance.get(`/videos/search?search=${data.search}`);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in fetching videos");
    throw error;
  }
});

export const comment = createAsyncThunk("comment", async (data) => {
  try {
    const res = await axiosInstance.post(`/videos/comment`, data);
    toast.success("Your comment marked successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in savint your comment");
    throw error;
  }
});

export const editComment = createAsyncThunk("editComment", async (data) => {
  try {
    const res = await axiosInstance.patch(`/videos/edit-comment`, data);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in editing comment");
    throw error;
  }
});

export const toggleCommentLike = createAsyncThunk(
  "toggleCommentLike",
  async (data) => {
    try {
      const res = await axiosInstance.post("/toggle-comment-like", data);
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error in toggling comment like"
      );
      throw error;
    }
  }
);

export const deleteComment = createAsyncThunk("deleteComment", async (data) => {
  try {
    const res = await axiosInstance.delete(
      `/delete-comment/${data.comment_id}`
    );
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in deleting comment");
  }
});

export const getComments = createAsyncThunk("getComments", async (data) => {
  try {
    const res = await axiosInstance.get(`get-comments`, data); //receiving page in req.body if video_id is passed. parentComment me no pagination.
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error fetching comments");
  }
});

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

const initialState = {
  video: {
    loading: true,
    videos: [],
    page: 1,
    hasMore: true,
  },
  comment: {
    loading: true,
    comments: [],
    page: 1,
    hasMore: true,
  },
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.video.loading = true;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.video.loading = false;
        state.video.videos = [...state.video.videos, action.payload.data.video];
      })
      .addCase(toggleVideoLike.pending, (state) => {
        state.video.loading = true;
      })
      .addCase(toggleVideoLike.fulfilled, (state, action) => {
        state.video.loading = false;
      })
      .addCase(getVideos.pending, (state) => {
        state.video.loading = true;
      })
      .addCase(getVideos.fulfilled, (state, action) => {
        state.video.loading = false;
        state.video.videos = [
          ...state.video.videos,
          ...action.payload.data.videos,
        ];
        if (action.payload.data.videos.length < 8) {
          state.video.hasMore = false;
        } else {
          state.video.hasMore = true;
        }
        state.video.page += 1;
      })
      .addCase(deleteVideo.pending , (state) => {
        state.video.loading = true;
      })
      .addCase(deleteComment.fulfilled , (state , action) => {
        state.video.loading = false;
        state.video.videos = state.video.videos.filter(video => video._id != action.payload.data._id);
      })
      .addCase(updateVideoDetails.pending , (state) => {
        state.video.loading = true;
      })
      .addCase(updateVideoDetails.fulfilled , (state , action) => {
        state.video.loading = false;
        state.video.videos = state.video.videos.map(video =>
            video._id === action.payload.data._id ? action.payload.data : video
        );
      })
      .addCase(comment.pending, (state, action) => {
        state.comment.loading = true;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.comment.loading = false;
        state.comment.comments = [
          ...state.comment.comments,
          action.payload.data.comment,
        ];
      })
      .addCase(editComment.pending, (state) => {
        state.comment.loading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.comment.loading = false;
        state.comment.comments = state.comment.comments.map((comment) =>
          comment._id === action.payload.data._id
            ? { ...comment, content: action.payload.data.content }
            : comment
        );
      })
      .addCase(deleteComment.pending, (state) => {
        state.comment.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comment.loading = false;
        state.comment.comments = state.comment.comments.filter(
          (comment) => comment._id !== action.payload.data._id
        );
      })
      .addCase(getComments.pending , (state) => {
        state.comment.loading = true;
      })
      .addCase(getComments.fulfilled , (state , action) => {
        state.comment.loading = false;
        state.comment.comments = [...state.comment.comments , ...action.payload.data.comments];
        if(action.payload.data.comments.length < 8){
            state.comment.hasMore = false;
        }
        else{
            state.comment.hasMore = true;
        }
        state.comment.page += 1;
      })
  },
});

export default videoSlice.reducer;
