import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";
import { act } from "react";

export const registerUser = createAsyncThunk("register", async (data) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);

  console.log("formData : ", formData);

  try {
    const res = await axiosInstance.post("/users/register", formData);
    console.log("register backend res : ", res);
    toast.success("Registered successfully!!!");
    return res.data;
  } catch (error) {
    console.log("Error in registering user : ", error);
    toast.error(error?.response?.data?.error);
  }
});

export const loginUser = createAsyncThunk("login", async (data) => {
  console.log("in loginUser");

  try {
    const res = await axiosInstance.post("/users/login", data);
    // console.log("login response: ", res.data);
    toast.success("Login successfully");
    return res.data;
  } catch (error) {
    console.log("error in login : ", error);
    toast.error(error?.response?.data?.error);
  }
});

export const logoutUser = createAsyncThunk("logout", async () => {
  try {
    const res = await axiosInstance.get("/users/logout");
    toast.success("Logout Successfully");
  } catch (error) {
    toast.error(error?.response?.data?.error);
  }
});

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (data, { rejectedWithValue }) => {
    // console.log("in getCurrentUser");

    try {
      //   console.log("in getCurrentUser try");
      const res = await axiosInstance.get(`/users/get-current-user`);
      //   console.log("res.data : ", res.data?.data);
      return res.data;
    } catch (error) {
      // console.log("error : " , error);

      toast.error(error?.response?.data?.error || "No current user");
    }
  }
);

export const changePassword = createAsyncThunk(
  "change-password",
  async (data) => {
    // const {oldPassword , newPassword} = data;
    try {
      const res = await axiosInstance.patch("/users/change-password", data);
      //   console.log("password-changed : ", res);      
      toast.success("Password changes successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
);

export const verifyOTP = createAsyncThunk("verify-otp", async (data) => {
  try {
    const res = await axiosInstance.post("/users/verify-otp", data);
    toast.success("OTP verifies successfully");
  } catch (error) {
    toast.error(error?.response?.data?.error);
  }
});

export const resendOTP = createAsyncThunk("resendOTP", async (data) => {
  try {
    const res = await axiosInstance.post("/users/resend-otp", data);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
  }
});

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async () => {
    try {
      const res = await axiosInstance.get("/users/refresh-access-token");
      return res;
    } catch (error) {
      console.log("error in refreshing access-token", error);
    }
  }
);

const initialState = {
  loading: false,
  loginStatus: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // console.log("action.payload.data : ", action.payload.data);
      state.loading = false;
      state.loginStatus = true;
      state.userData = action.payload.data;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.loginStatus = false;
      state.userData = {};
    });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      // console.log(".loginStatus : " , action.payload.data.loginStatus);

      state.loading = false;
      state.loginStatus = action.payload.data.loginStatus;
      state.userData = action.payload.data.userData;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      //   console.log("in rejected : ", action.error);
      state.loading = false;
      state.loginStatus = false;
      state.userData = {};
    });
  },
});

export default authSlice.reducer;
