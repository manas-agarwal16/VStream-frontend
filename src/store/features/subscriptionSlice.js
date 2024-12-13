import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";

export const toggleSubscribe = createAsyncThunk(
  "toggleSubscribe",
  async (data) => {
    console.log("toggleSubscribe data : ", data);

    try {
      const res = await axiosInstance.post(
        `/subscription/toggle-subscribe`,
        data
      );
      console.log("res.data : ", res.data);
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error in toggling subscription"
      );
    }
  }
);

export const subscriptionChannels = createAsyncThunk(
  "subscriptionChannels",
  async (data) => {
    try {
      const res = await axiosInstance.get(`subscription/subscription-channels`);
      return res?.data;
    } catch (error) {
    //   toast.error(
    //     error?.response?.data?.error ||
    //       "Error in fetching subscription channels"
    //   );
    }
  }
);

const initialState = {
  loading: false,
  channels: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscriptionChannels.pending, (state) => {
        console.log("pending subscription");

        state.loading = true;
      })
      .addCase(subscriptionChannels.fulfilled, (state, action) => {
        console.log("fulfilled subscription");

        if (action.payload) {
          state.loading = false;
          state.channels = action.payload.data;
        }
        else{
            state.loading = false;
        }
      })
      .addCase(subscriptionChannels.rejected, (state) => {
        console.log("rejected subscription");
        state.loading = false;
      });
  },
});

export default subscriptionSlice.reducer;
