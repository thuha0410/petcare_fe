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

// Add request interceptor for authentication
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
      const status = error.response.status;
      
      // Handle 401 Unauthorized
      if (status === 401) {
        localStorage.removeItem("token_client");
        localStorage.removeItem("token_kh");
        localStorage.removeItem("mail_kh");
        localStorage.removeItem("name_kh");
        localStorage.removeItem("id_khach_hang");
        
        // If we're not already on the login page, redirect
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/client/dang-nhap-dang-ky')) {
          window.location.href = '/client/dang-nhap-dang-ky';
        }
        
        toaster.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
      } 
      // Handle validation errors
      else if (status === 422 && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (let field in errors) {
          errors[field].forEach(err => {
            toaster.error(err);
          });
        }
      } 
      // Handle other errors with messages
      else if (error.response.data?.message) {
        toaster.error(error.response.data.message);
      } 
      // Default error message
      else {
        toaster.error("Lỗi không xác định từ máy chủ.");
      }
    } else {
      toaster.error("Không kết nối được tới máy chủ.");
    }
    return Promise.reject(error);
  }
);

// Function to check if user is authenticated
apiClient.kiemTraDangNhap = (to, from, next) => {
  apiClient.post("/api/khach-hang/Kiem-tra-dang-nhap", {})
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem("name_kh", res.data.name);
        localStorage.setItem("mail_kh", res.data.email);
        localStorage.setItem("token_kh", res.data.status);
        next();
      } else {
        localStorage.removeItem("token_kh");
        localStorage.removeItem("mail_kh");
        localStorage.removeItem("name_kh");
        next("/client/dang-nhap-dang-ky");
        toaster.error(res.data.message);
      }
    })
    .catch(() => {
      next("/client/dang-nhap-dang-ky");
    });
};

export default apiClient;
