import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../helper/axiosInstance";

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

const initialState = {
  loading: true,
  comments: [],
  page: 1,
  hasMore: true,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    makeCommentsEmpty: (state) => {
      state.comments = [];
    },
    incrementPage : (state) => {
      state.page = state.page + 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter(
          (video) => video._id != action.payload.data._id
        );
      });

      builder.addCase(editComment.pending, (state) => {
        state.loading = true;
      })

      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.map((comment) =>
          comment._id === action.payload.data._id
            ? { ...comment, content: action.payload.data.content }
            : comment
        );
      });

      builder.addCase(getComments.pending, (state) => {
        state.loading = true;
      })

      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = [...state.comments, ...action.payload.data.comments];
        if (action.payload.data.comments.length < 8) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
        // state.page += 1;
      });
  },
});

export const { makeCommentsEmpty } = commentSlice.actions;

export default commentSlice.reducer;
