import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

// ═══════════════════════════════════════════════════════════════════
// REGISTER
// ═══════════════════════════════════════════════════════════════════
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/register`, userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ═══════════════════════════════════════════════════════════════════
// LOGIN — Step 1 (sends OTP, does NOT return token yet)
// ═══════════════════════════════════════════════════════════════════
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/login`, userData);
      return res.data; // { message, email }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ═══════════════════════════════════════════════════════════════════
// VERIFY OTP — Step 2 (returns token + user)
// ═══════════════════════════════════════════════════════════════════
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/verify-otp`, { email, otp });
      return res.data; // { token, user }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ═══════════════════════════════════════════════════════════════════
// RESEND OTP
// ═══════════════════════════════════════════════════════════════════
export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (email, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/resend-otp`, { email });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ═══════════════════════════════════════════════════════════════════
// RESTORE FROM LOCALSTORAGE
// ═══════════════════════════════════════════════════════════════════
const savedToken = localStorage.getItem("token");
let savedUser = null;
try {
  const data = localStorage.getItem("user");
  savedUser = data ? JSON.parse(data) : null;
} catch {
  localStorage.removeItem("user");
}

// ═══════════════════════════════════════════════════════════════════
// SLICE
// ═══════════════════════════════════════════════════════════════════
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: savedUser,
    token: savedToken || null,
    otpEmail: null,       // email waiting for OTP verification
    otpSent: false,       // true after login step 1 succeeds
    loading: false,
    error: null
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.otpEmail = null;
      state.otpSent = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearOTPState: (state) => {
      state.otpEmail = null;
      state.otpSent = false;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      // LOGIN step 1 — OTP sent
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.otpEmail = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // VERIFY OTP — issues token
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otpSent = false;
        state.otpEmail = null;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Invalid OTP";
      })

      // RESEND OTP
      .addCase(resendOTP.fulfilled, (state) => {
        state.error = null;
      });
  }
});

export const { logout, clearOTPState } = authSlice.actions;
export default authSlice.reducer;
