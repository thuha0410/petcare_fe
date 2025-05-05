import axios from 'axios';

const apiDoctor = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

apiDoctor.interceptors.request.use(config => {
  // Ưu tiên sử dụng token_doctor nếu có, nếu không thì dùng token_admin
  const token_doctor = localStorage.getItem('token_doctor');
  const token_admin = localStorage.getItem('token_admin');
  const token = token_doctor || token_admin;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default apiDoctor;
