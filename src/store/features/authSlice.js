import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import axios from "axios";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
  "register",
  async (userData, { rejectWithValue }) => {
    let avatarURL;

    let data = {};
    console.log("userData.avatar[0] : ", userData.avatar[0]);

    if (userData.avatar[0]) {
      const avatarAndPresetName = new FormData();
      avatarAndPresetName.append("file", userData.avatar[0]);
      avatarAndPresetName.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESET_NAME
      );

      data = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        avatarAndPresetName
      );
    }

    data.username = userData.username;
    data.email = userData.email;
    data.password = userData.password;
    data.fullName = userData.fullName;
    data.avatar = data.secure_url;

    try {
      const res = await axiosInstance.post("/users/register", data);
      console.log("Register backend response:", res.data);
      toast.success(res.data.message, {
        autoClose: 2500,
      });
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
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
      return res.data;
      a;
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
