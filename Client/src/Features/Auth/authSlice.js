// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// // import { React } from "react";

// const API = "http://localhost:5000/api/auth";
// // Register API 

//   console.log("Thunk started")

// export const register = createAsyncThunk(
//   "auth/register",
//   // console.log("Thunk started")
//   async (userData, thunkAPI) => {
//     try {
//       const res = await axios.post(`${API}/register`, userData);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );


// /* ================= LOGIN API ================= */

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (userData, thunkAPI) => {
//     console.log("🐴 thunkAPI", thunkAPI);
//     console.log("🤖 userData", userData);

//     try {
//       const res = await axios.post(`${API}/login`, userData);


//       console.log("🧅 res", res);

//       return res.data; // { token, user }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// /* ================= SLICE ================= */




//   const savedToken = localStorage.getItem("token")
// // const savedUser = JSON.parse(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) :null )


// const savedUser = savedUser ? JSON.parse (savedUser): null ;
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: savedUser ,
//     // token: localStorage.getItem("token") || null,
//     token: savedToken || null,
//     loading: false,
//     error: null
//   },

//   reducers: {

//     /* LOGOUT */
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("use");
//       localStorage.removeItem("token")
//     }
//   },

//   extraReducers: (builder) => {

//     builder


//         /* REGISTER SUCCESS */
//       .addCase(register.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//       })
//       /* LOGIN PENDING */
//       .addCase(loginUser.fulfilled, (state, action) => {


//         state.loading = false;
//         state.user= action.payload.user;
//         state.token = action.payload.token;

//         localStorage.setItem("token", action.payload.token)
//         localStorage.setItem("user",JSON.stringify(action.payload.user) )
//       })

//       /* LOGIN SUCCESS */
//       // .addCase(loginUser.fulfilled, (state, action) => {

//       //   state.loading = false;
//       //   state.user = action.payload.user;
//       //   state.token = action.payload.token;

//       //   /* ⭐⭐⭐ THIS IS WHERE TOKEN GOES ⭐⭐⭐ */
//       //   localStorage.setItem("token", action.payload.token);
//       // })

//       /* LOGIN FAILED */
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

/* ================= REGISTER ================= */

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

/* ================= LOGIN ================= */

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/login`, userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/* ================= RESTORE STORAGE ================= */

const savedToken = localStorage.getItem("token");

// const savedUserData = localStorage.getItem("user");


// const savedUser = savedUserData ? JSON.parse(savedUserData) : null;
let savedUser = null;

try {
  const data = localStorage.getItem("user");
  savedUser = data ? JSON.parse(data) : null;
} catch (err) {
  console.warn("Invalid user in localStorage — clearing");
  localStorage.removeItem("user");
}


/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: savedUser,
    token: savedToken || null,
    loading: false,
    error: null
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;