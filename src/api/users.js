import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Fetch all users
export const fetchUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

// Fetch single user
export const fetchUser = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

// Create user (simulated)
export const createUser = async (data) => {
  const res = await API.post("/users", data);
  return res.data;
};

// Update user (simulated)
export const updateUser = async (id, data) => {
  const res = await API.put(`/users/${id}`, data);
  return res.data;
};

// Delete user (simulated)
export const deleteUser = async (id) => {
  await API.delete(`/users/${id}`);
  return true;
};
