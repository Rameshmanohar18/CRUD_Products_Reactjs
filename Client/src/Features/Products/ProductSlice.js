// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = "http://localhost:5000/api/products";


// // CREATE PRODUCT API
// export const addProduct = createAsyncThunk(
//   "products/addProduct",
//   async (product) => {
//     const res = await axios.post(API, product);
//     return res.data;
//   }
// );


// // GET PRODUCTS API
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const res = await axios.get(API);
//     return res.data;
//   }
// );


// const productSlice = createSlice({
//   name: "products",
//   initialState: [],
//   reducers: {},

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         return action.payload;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.push(action.payload);
//       });
//   }
// });

// export default productSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/products";


// =============================
// CREATE PRODUCT
// =============================
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const res = await axios.post(API, product);
    return res.data;
  }
);


// =============================
// GET ALL PRODUCTS
// =============================
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);


// =============================
// GET SINGLE PRODUCT
// =============================
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  }
);


// =============================
// UPDATE PRODUCT
// =============================
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }) => {
    const res = await axios.put(`${API}/${id}`, product);
    return res.data;
  }
);


// =============================
// DELETE PRODUCT
// =============================
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);


// =============================
// SLICE
// =============================
const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedProduct: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // GET ONE
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          p => p._id === action.payload._id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          p => p._id !== action.payload
        );
      });
  }
});

export default productSlice.reducer;