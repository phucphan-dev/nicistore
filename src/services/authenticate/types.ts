export interface RegisterDataRequest {
  full_name: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginDataRequest {
  email: string;
  password: string;
}

export interface LoginDataResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfileData {
  id: number
  email: string
  fullName: string
  phone: string
  active: string
  createdAt: string
  updatedAt: string
}
