import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);

    console.log("form data : ", formData);

    try {
      const res = await axiosInstance.post("/users/register", formData);
      console.log("register backend res : ", res.data);
      // toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const verifyOTP = createAsyncThunk("verify-otp", async (data) => {
  try {
    const res = await axiosInstance.post("/users/verify-otp", data);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const resendOTP = createAsyncThunk("resendOTP", async (data) => {
  try {
    const res = await axiosInstance.get(`/users/resend-otp/${data.email}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const loginUser = createAsyncThunk("login", async (data) => {
  // console.log("in loginUser");

  try {
    const res = await axiosInstance.post("/users/login", data);
    console.log("login response: ", res.data);
    toast.success("Loged in successfully");
    return res.data;
  } catch (error) {
    console.log("error in login : ", error);
    toast.error(error?.response?.data?.message);
    return false;
  }
});

export const logoutUser = createAsyncThunk("logout", async () => {
  try {
    const res = await axiosInstance.get("/users/logout");
    toast.success("Logout Successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
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

      // toast.error(error?.response?.data?.message || "No current user");
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
      toast.error(error?.response?.data?.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async () => {
    try {
      const res = await axiosInstance.get("/users/refresh-access-token");
      return res.data;a
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
    builder
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOTP.rejected, (state) => {
        state.loading = false;
      });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log("in rejection : ", action.error);
      state.loading = false;
    });

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
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.loginStatus = false;
        state.userData = {};
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.loginStatus = action.payload.data.loginStatus;
        state.userData = action.payload.data.userData;
      } else {
        state.loginStatus = false;
        state.userData = {};
      }
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
