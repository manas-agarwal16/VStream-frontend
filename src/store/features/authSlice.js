import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helper/axiosInstance";
import toast from "react-hot-toast";



export const registerUser = createAsyncThunk("register" , async (data) => {
    const formData = new FormData();
    formData.append("avatar" , data.avatar);
    formData.append("username" , data.username);
    formData.append("password" , data.password);
    formData.append("fullName" , data.fullName);
    formData.append("email" , data.email);

    console.log("formData : " , formData);

    try {
        const res = await axiosInstance.post("/users/register" , formData);
        console.log("register backend res : " , res);
        toast.success("Registered successfully!!!");
        return res.data;
        
    } catch (error) {
        console.log("Error in registering user : " , error);
        toast.error(error?.response?.data?.error);
    }  
})

export const loginUser = createAsyncThunk("login" , async (data) => {
    try {
        const res = await axiosInstance.post("/users/login" , data);
        console.log("login response: " , res);
        toast.success("Login successfully");
        return res.data;
    } catch (error) {
        console.log("error in login : " , error);
        toast.error(error?.response?.data?.error);
    }
})

export const logoutUser = createAsyncThunk("logout" , async () => {
    try {
        const res = await axiosInstance.get("/users/logout");
        toast.success("Logout Successfully");
    } catch (error) {
        toast.error(error?.response?.data?.error);
    }
})

export const changePassword = createAsyncThunk("change-password" , async (data) => {
    // const {oldPassword , newPassword} = data;
    try {
        const res = await axiosInstance.patch("/users/change-password" , data);
        console.log("password-changed : " , res);
        return res.data;
        
        toast.success("Password changes successfully");
    } catch (error) {
        toast.error(error?.response?.data?.error);
    }
});

export const verifyOTP = createAsyncThunk("verify-otp" , async (data) => {
    try {
        const res = await axiosInstance.post("/users/verify-otp" , data);
        toast.success("OTP verifies successfully");
    } catch (error) {
        toast.error(error?.response?.data?.error);
    }
})

export const resendOTP = createAsyncThunk("resendOTP" , async (data) => {
    try {
        const res = await axiosInstance.post("/users/resend-otp" , data);
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
    }
})

export const refreshAccessToken = createAsyncThunk("refreshAccessToken" , async () => {
    try {
        const res = await axiosInstance.get("/users/refresh-access-token");
        return res;
    } catch (error) {
        console.log("error in refreshing access-token" , error);
    }
})

export const updateAvatar = createAsyncThunk("updateAvatar" , async (data) => {
    const formData = new FormData();
    formData.append("avatar" , data.avatar);
    try {
        const res = await axiosInstance.patch("/users/update-avatar" , formData);
        toast.success("Avatar updated successfully");
        return res;
    } catch (error) {
        toast.error(error?.data?.response?.error);
    }
});


const initialState = {
    loading : true,
    loginStatus : false,
    userData : null,
}
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {

        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(registerUser.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.loginStatus = true;
            state.userData = action.payload.userData;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.loginStatus = false;
            state.userData = null;
        });

        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.userData = { ...state.userData, avatar: action.payload.avatar };
        });
    }
})

export default authSlice.reducer;