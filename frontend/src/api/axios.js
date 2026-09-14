import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Adjunta el token JWT guardado en localStorage a cada peticion
api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('taskflow_user');
  if (userData) {
    const { token } = JSON.parse(userData);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
