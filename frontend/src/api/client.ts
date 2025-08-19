// src/api/client.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust to your backend URL
});

export default api;