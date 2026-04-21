// lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://your-backend.onrender.com/api"
});