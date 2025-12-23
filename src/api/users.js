import axios from "axios";

// For development (local)
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// For production (Render) – uncomment later
// const API = axios.create({
//   baseURL: "https://your-render-backend.onrender.com/api",
// });


// =============================
// PRODUCTS
// =============================

// Fetch all products
export const fetchProducts = async () => {
  const res = await API.get("/products/");
  return res.data;
};

// Fetch single product
export const fetchProduct = async (id) => {
  const res = await API.get(`/products/${id}/`);
  return res.data;
};



// =============================
// VARIANTS
// =============================

// Fetch variants of a product
export const fetchVariants = async (productId) => {
  const res = await API.get(`/products/${productId}/variants/`);
  return res.data;
};



// =============================
// ENQUIRY FORM
// =============================

export const sendEnquiry = async (data) => {
  const res = await API.post("/enquiry/", data);
  return res.data;
};
