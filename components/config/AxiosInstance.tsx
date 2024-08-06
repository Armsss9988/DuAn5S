import axios, { AxiosRequestConfig } from 'axios';
import { SERVER_URL } from '@/constants/serverURL';
// import { getToken } from './authService';

const PRODUCTION = '113.161.12.112';
const DEVELOPMENT = '192.168.100.3';
const NGROK_LINK = 'https://7a8f-113-161-12-175.ngrok-free.app'
const PORT= `44329`;
const BASE_URL = `http://${DEVELOPMENT}:44329/`;

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

instance.interceptors.request.use(
  (config) => {
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log(`Request URL: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {

    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default instance;
