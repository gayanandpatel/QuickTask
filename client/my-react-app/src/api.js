// For local development, this file sets up the base URL for API requests to the Node.js backend server.
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Node.js backend URL
});

// Automatically add the token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// In production, this file would be replaced to point to the deployed backend server URL.
// import axios from 'axios';

// // Use environment variable for the base URL, fallback to localhost for dev
// const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;