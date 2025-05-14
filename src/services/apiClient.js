import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: 'top-left' });

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Add request interceptor for client token
apiClient.interceptors.request.use(
  config => {
    const clientToken = localStorage.getItem('token_client');
    if (clientToken) {
      config.headers['Authorization'] = `Bearer ${clientToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      toaster.error(error.response.data.message || 'Có lỗi xảy ra');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
