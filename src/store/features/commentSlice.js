import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../helper/axiosInstance";
import { get } from "react-hook-form";

export const comment = createAsyncThunk(
  "comment",
  async (data, { rejectWithValue }) => {
    console.log("comment data : ", data);

    try {
      const res = await axiosInstance.post(`/videos/comment`, data);
      console.log("res.data : ", res.data);
      toast.success("Your comment marked successfully");
      return res.data;
      // return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error in savint your comment"
      );
      // throw error;
      return rejectWithValue(error?.message || "error in commenting in video");
    }
  }
);

export const editComment = createAsyncThunk("editComment", async (data) => {
  // console.log("in editComment");

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
    console.log("toggleCommentLike");

    try {
      const res = await axiosInstance.post("/videos/toggle-comment-like", {
        oldComment: data.comment,
      });
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
  console.log("data : ", data);
  try {
    const res = await axiosInstance.delete(
      `videos/delete-comment/${data?.comment_id}`
    );
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error in deleting comment");
  }
});

export const getComments = createAsyncThunk(
  "getComments",
  async (data, { rejectWithValue }) => {
    // console.log("get Comments");

    try {
      // console.log("data : ", data);
      const params = { video_id: data.video_id, page: data.page };
      const res = await axiosInstance.get(`/videos/get-comments`, { params }); //receiving page in req.body if video_id is passed. parentComment me no pagination.
      // console.log("res.data", res.data);

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error fetching comments");
      return rejectWithValue(error?.response?.data || "Error fetching videos");
    }
  }
);

const initialState = {
  loading: false,
  comments: [], //each comment : {avatar , username , likes , isLiked , content}
  totalComments: 0,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    makeCommentsEmpty: (state) => {
      state.comments = [];
      state.totalComments = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(comment.pending, (state) => {
        state.loading = true;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.loading = false;
        state.totalComments += 1;
        state.comments = [action.payload.data, ...state.comments];
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id != action.payload.data._id
        );
        state.totalComments -= 1;
      });

    builder
      .addCase(editComment.pending, (state) => {
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

    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })

      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(
        //   "action.payload.data.comments : ",
        //   action.payload.data
        // );
        state.totalComments = action.payload.data.totalComments;
        state.comments = [...state.comments, ...action.payload.data.videoComments];
        // state.page += 1;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error?.message);
      });

    builder
      .addCase(toggleCommentLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        console.log("action.payload.data : ", action.payload.data);

        state.loading = false;
        state.comments = state.comments.map((comment) => {
          return comment._id === action.payload.data._id
            ? action.payload.data
            : comment;
        });
      });
  },
});

export const { makeCommentsEmpty, incrementPage } = commentSlice.actions;

export default commentSlice.reducer;
