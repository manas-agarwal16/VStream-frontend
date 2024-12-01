import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../helper/axiosInstance";

export const createPlaylist = createAsyncThunk(
  "createPlaylist",
  async (data) => {
    try {
      const res = await axiosInstance.post(`/playlist/create`, data);
      toast.success(`Playlist ${data.title} created successfully`);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error in creating playlist");
    }
  }
);

export const addToPlaylist = createAsyncThunk("addToPlaylist", async (data) => {
  try {
    const res = await axiosInstance.post(`/playlist/add-to-playlist`, data);
    toast.success(`video added to ${data.title} successfully`);
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error || "error adding video to playlist"
    );
  }
});

export const removeFromPlaylist = createAsyncThunk(
  "removeFromPlaylist",
  async (data) => {
    try {
      const res = await axiosInstance.delete(
        `/playlist/remove-from-playlist?title=${data.title}&video_id=${data.video_id}`
      );
      toast.success(`video removed from ${data.title} successfully`);
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "error removing video to playlist"
      );
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "deletePlaylist",
  async (data) => {
    try {
      const res = await axiosInstance.delete(
        `/playlist/delete-playlist?title=${data.title}`
      );
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || "error in deleting playlist");
    }
  }
);

export const myPlaylists = createAsyncThunk("myPlaylists", async () => {
  try {
    const res = await axiosInstance.get(`/playlist/my-playlists`);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "error in fetching playlists");
  }
});

export const viewPlaylist = createAsyncThunk("viewPLaylist", async (data) => {
  try {
    const res = await axiosInstance.get(`/playlist/view-playlist`, data);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "error in viewing playlist");
  }
});

export const renamePlaylist = createAsyncThunk(
  "renamePlaylist",
  async (data) => {
    try {
      const res = await axiosInstance.patch(`/playlist/rename-playlist`, data);
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "error in renaming the playlist"
      );
    }
  }
);

const initialState = {
  loading: true,
  playlists: [],
  curPlaylist: null,
};

// const playlistSlice = createSlice({
//     name : "playlist",
//     initialState,
//     reducers : {},
//     extraReducers : (builder) => {
//         builder
//         .addCase(myPlaylists ,(state) => {
//             state.loading = true;
//         })
//         .addCase(myPlaylists , (state , action) =>{
//             state.loading = false;
//             state.playlists = action.payload.data;
//         });

//         builder
//         .addCase(viewPlaylist ,(state) => {
//             state.loading = true;
//         })
//         .addCase(viewPlaylist , (state , action) => {
//             state.loading = false;
//             curPlaylist = action.payload.data;
//         });
//     }
// })

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling myPlaylists action
    builder
      .addCase(myPlaylists.pending, (state) => {
        state.loading = true;
      })
      .addCase(myPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload.data;
      })
      .addCase(myPlaylists.rejected, (state) => {
        state.loading = false;
      });

    // Handling viewPlaylist action
    builder
      .addCase(viewPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.curPlaylist = action.payload.data;
      })
      .addCase(viewPlaylist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default playlistSlice.reducer;
