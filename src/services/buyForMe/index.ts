import { BuyForMeDataRequest } from './types';

import axiosInstance from 'services/common/instance';

export const buyForMeUnAuthService = async (data: BuyForMeDataRequest): Promise<void> => {
  const formData = new FormData();
  formData.append('fullname', data.fullname);
  formData.append('phone', data.phone);
  formData.append('email', data.email);
  if (data.guestNote) {
    formData.append('guestNote', data.guestNote);
  }
  if (data.productImages) {
    data.productImages.forEach((item, index) => {
      formData.append(`productImages[${index.toString()}]`, item);
    });
  }
  await axiosInstance.post('client/represent-orders/create-order-without-auth', formData);
};

export const buyForMeService = async (data: BuyForMeDataRequest): Promise<void> => {
  const formData = new FormData();
  formData.append('fullname', data.fullname);
  formData.append('phone', data.phone);
  formData.append('email', data.email);
  if (data.guestNote) {
    formData.append('guestNote', data.guestNote);
  }
  if (data.productImages) {
    data.productImages.forEach((item, index) => {
      formData.append(`productImages[${index.toString()}]`, item);
    });
  }
  await axiosInstance.post('client/represent-orders/create-order', formData);
};
