import {
  LoginDataRequest, LoginDataResponse, RegisterDataRequest, UserProfileData
} from './types';

import axiosInstance from 'services/common/instance';

export const registerService = async (data: RegisterDataRequest): Promise<void> => {
  await axiosInstance.post('customers/auth/register', data);
};

export const registerVerifyEmailService = async (verify_code: string): Promise<void> => {
  await axiosInstance.post('customers/auth/verify', { verify_code });
};

export const loginService = async (data: LoginDataRequest): Promise<LoginDataResponse> => {
  const response = await axiosInstance.post('customers/auth/login', data);
  return response.data;
};

export const refreshTokenService = async (refreshToken: string): Promise<LoginDataResponse> => {
  const response = await axiosInstance.post('customers/auth/refresh-token', { refreshToken });
  return response.data;
};

export const getProfileService = async (): Promise<UserProfileData> => {
  const response = await axiosInstance.get('customers/auth/profile');
  return response.data.data;
};

export const logoutService = async (): Promise<void> => {
  await axiosInstance.get('customers/auth/logout');
};
