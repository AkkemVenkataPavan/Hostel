// src/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:https:https://hostel-frontend-3rsc.onrender.com", // your backend
  headers: { "Content-Type": "application/json" }
});

export default instance;
