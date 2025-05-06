import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: 'top-left' });

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for client token
apiClient.interceptors.request.use(config => {
  const clientToken = localStorage.getItem('token_client');
  if (clientToken) {
    config.headers['Authorization'] = `Bearer ${clientToken}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Handle unauthorized errors
      if (error.response.status === 401) {
        localStorage.removeItem('token_client');
        localStorage.removeItem('token_kh');
        localStorage.removeItem('mail_kh');
        localStorage.removeItem('name_kh');
        window.location.href = '/client/dang-nhap-dang-ky';
        toaster.error('Vui lòng đăng nhập lại.');
      } else {
        toaster.error(error.response.data.message || 'Có lỗi xảy ra');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
