import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import { getAccessToken } from './storage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  ($config: AxiosRequestConfig): AxiosRequestConfig => {
    if ($config.headers) {
      const token = getAccessToken();
      if (token) {
        $config.headers.Authorization = `Bearer ${token}`;
      }
      $config.headers['Content-Type'] = 'application/json';
      $config.headers.Accept = 'application/json';
    }
    return $config;
  },
  async (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> => Promise.reject(
    error.response && error.response.status === 422 ? (error.response.data as any).errors : error,
  ),
);
export default axiosInstance;
