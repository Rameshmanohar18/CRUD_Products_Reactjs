import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});









API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



// GET PRODUCTS
export const fetchProductsAPI = () =>
  API.get("/products");

// CREATE
export const createProductAPI = (data) =>
  API.post("/products", data);

// UPDATE
export const updateProductAPI = (id, data) =>
  API.put(`/products/${id}`, data);

// DELETE
export const deleteProductAPI = (id) =>
  API.delete(`/products/${id}`);


