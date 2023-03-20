import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import {
  getAccessToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken
} from './storage';

import { refreshTokenService } from 'services/authenticate';

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
  async (error: AxiosError): Promise<AxiosError> => {
    const status = error.response ? error.response.status : null;
    const originalRequest = error.config;
    const token = getAccessToken();
    if (status === 401 && token) {
      return new Promise((_, reject) => {
        refreshTokenService(token)
          .then((data) => {
            if (originalRequest && originalRequest.headers) {
              setAccessToken(data.accessToken);
              setRefreshToken(data.refreshToken);
            }
          })
          .catch((err) => {
            removeAccessToken();
            removeRefreshToken();
            reject(err);
          });
      });
    }
    if (error.response) {
      if (status === 422) {
        return Promise.reject((error.response.data as { errors: ErrorResponse[] }).errors);
      }
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
