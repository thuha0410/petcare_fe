import axios from 'axios';

const apiDoctor = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

apiDoctor.interceptors.request.use(config => {
  const token = localStorage.getItem('token_doctor');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default apiDoctor;
