import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BACKEND_URL,
});

// TODO: Uncomment this code to send auth tokens FE -> BE

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const hasAuthHeader = error.config?.headers?.Authorization;
//       if (hasAuthHeader) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("userType");
//         window.location.href = "/admin/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
