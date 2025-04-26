import axios from 'axios';

// Gắn bearer token tự động cho mọi request
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token_admin');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axios;
