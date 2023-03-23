import { ProductCategoryData } from './types';

import axiosInstance from 'services/common/instance';

export const getAllProductCategoriesService = async (): Promise<ProductCategoryData[]> => {
  const response = await axiosInstance.get('client/product-categories');
  return response.data.data;
};

export const getProductCategoryDetailService = null;
