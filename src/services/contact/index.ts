import { ContactDataRequest } from './types';

import axiosInstance from 'services/common/instance';

export const contactUsService = async (data: ContactDataRequest): Promise<void> => {
  await axiosInstance.post('client/contacts', data);
};

export const subcribeService = async (email: string): Promise<void> => {
  await axiosInstance.post('client/subscribes', { email });
};
