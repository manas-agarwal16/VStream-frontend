import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";

export const getSongs = createAsyncThunk("getSongs", async (data) => {
  try {
    const res = await axiosInstance.get(`/songs/get-songs?page=${data.page}`);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return false;
  }
});

export const searchSongs = createAsyncThunk("searchSongs", async (data) => {

    console.log("search Songs.....");
    
  try {
    const res = await axiosInstance.get(`/songs/search/${data.search}`);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Error search for songs");
  }
});

const initialState = {
  loading: false,
  songs: [],
  searchedSongs : [],
  hasMore: true,
  page: 1,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    makeSongsEmpty: (state) => {
      state.songs = [];
      state.page = 1;
      state.hasMore = true;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSongs.fulfilled, (state, action) => {
        console.log("action.payload.data : ", action.payload.data);

        state.loading = false;
        if (action.payload.data.length < 6) {
          console.log("no more hasMode");
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
        state.songs = [...state.songs, ...action.payload.data];
      })
      .addCase(getSongs.rejected, (state, action) => {
        state.loading = false;
        console.log("rejected in musicSlice getsongs : ", action.payload);
      });

    builder
      .addCase(searchSongs.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedSongs = action.payload.data;
      })
      .addCase(searchSongs.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { makeSongsEmpty, incrementPage } = musicSlice.actions;

export default musicSlice.reducer;
