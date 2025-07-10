import axios from 'axios';
import { getToken } from '../utils/auth'; // ✅ import getToken

const API = axios.create({
  baseURL: 'https://medi-connect-e4tr.vercel.app',
});

// ✅ Add the token properly
API.interceptors.request.use(
  (config) => {
     const token = getToken();
    //const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("🚫 No token found in localStorage.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
