import axios from 'axios';
import { getToken } from '../utils/auth'; // ✅ import getToken

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ✅ Add the token properly
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token added to header:", token); // debug log
    } else {
      console.log("🚫 No token found in localStorage.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
