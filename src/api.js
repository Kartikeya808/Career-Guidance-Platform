import axios from "axios";

// Auto-connect to backend (works for both local and deployed)
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://career-guidance-platform-gdyf.onrender.com/api",
});

// ---- AUTH ROUTES ----

// Login user
export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

// Register user
export const registerUser = async ({ name, email, password, role }) => {
  try {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

// ---- CAREER ROUTES ----

// Fetch all careers
export const fetchCareers = async () => {
  try {
    const res = await api.get("/careers");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch careers" };
  }
};

// Add a new career
export const addCareer = async (careerData) => {
  try {
    const res = await api.post("/careers", careerData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add career" };
  }
};

export default api;
