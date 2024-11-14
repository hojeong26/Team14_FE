import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });
  return instance;
};

const BASE_URL = 'http://3.39.23.121:8080/api/v1';
const TOKEN = 'token';

export const fetchInstance = initInstance({
  // baseURL: BASE_URL,
});

export const fetchAuthInstance = initInstance({
  // baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  },
});
