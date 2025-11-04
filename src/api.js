import axios from "axios";

// This automatically connects frontend to your backend API on Render
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // for Vite
  // For CRA, you'd use: process.env.REACT_APP_API_BASE_URL
});

// Auth routes
export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

// Career routes
export const fetchCareers = async () => {
  try {
    const res = await api.get("/careers");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch careers" };
  }
};

export default api;
