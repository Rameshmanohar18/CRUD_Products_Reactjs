import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/auth";
// Register API 

  console.log("Thunk started")

export const register = createAsyncThunk(
  "auth/register",

  // console.log("Thunk started")
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/register`, userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


/* ================= LOGIN API ================= */

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    console.log("🐴 thunkAPI", thunkAPI);
    console.log("🤖 userData", userData);

    try {
      const res = await axios.post(`${API}/login`, userData);


      console.log("🧅 res", res);

      return res.data; // { token, user }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null
  },

  reducers: {

    /* LOGOUT */
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  },

  extraReducers: (builder) => {

    builder


        /* REGISTER SUCCESS */
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      /* LOGIN PENDING */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      /* LOGIN SUCCESS */
      .addCase(loginUser.fulfilled, (state, action) => {

        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        /* ⭐⭐⭐ THIS IS WHERE TOKEN GOES ⭐⭐⭐ */
        localStorage.setItem("token", action.payload.token);
      })

      /* LOGIN FAILED */
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;








// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null
// }

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {

//     register: (state, action) => {
//       const users = JSON.parse(localStorage.getItem("users")) || []
//       users.push(action.payload)
//       localStorage.setItem("users", JSON.stringify(users))
//     },

//     login: (state, action) => {
//       const users = JSON.parse(localStorage.getItem("users")) || []

//       const foundUser = users.find(
//         u => u.email === action.payload.email &&
//              u.password === action.payload.password
//       )

//       if (foundUser) {
//         state.user = foundUser
//         localStorage.setItem("user", JSON.stringify(foundUser))
//       } else {
//         alert("Invalid credentials")
//       }
//     },

//     logout: (state) => {
//       state.user = null
//       localStorage.removeItem("user")
//     }

//   }
// })

// export const { register, login, logout } = authSlice.actions
// export default authSlice.reducer



