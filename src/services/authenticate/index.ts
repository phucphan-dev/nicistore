import {
  ChangePasswordDataRequest,
  LoginDataRequest, LoginDataResponse,
  RegisterDataRequest, UpdateProfileDataRequest, UserProfileData
} from './types';

import axiosInstance from 'services/common/instance';

export const registerService = async (data: RegisterDataRequest): Promise<void> => {
  await axiosInstance.post('customers/auth/register', data);
};

export const registerVerifyEmailService = async (verifyCode: string): Promise<void> => {
  await axiosInstance.post('customers/auth/verify', { verifyCode });
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

export const updateProfileService = async (data: UpdateProfileDataRequest): Promise<void> => {
  const response = await axiosInstance.put('customers/auth/update-profile', data);
  return response.data.data;
};

export const changePasswordService = async (data: ChangePasswordDataRequest): Promise<void> => {
  const response = await axiosInstance.put('customers/auth/change-password', data);
  return response.data.data;
};

export const logoutService = async (): Promise<void> => {
  await axiosInstance.post('customers/auth/logout');
};
