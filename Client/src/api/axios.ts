import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Add interceptor to include token in every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
