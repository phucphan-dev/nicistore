import {
  FilterProductParams, ProductCategoryData, ProductDetail, ProductListItemData
} from './types';

import axiosInstance from 'services/common/instance';

export const getAllProductCategoriesService = async (): Promise<ProductCategoryData[]> => {
  const response = await axiosInstance.get('client/product-categories');
  return response.data.data;
};

export const getAllProductService = async (params?: FilterProductParams):
  Promise<APIPaginationResponse<ProductListItemData[]>> => {
  const response = await axiosInstance.get('client/products', { params });
  return response.data;
};

export const getProductDetailService = async (slug: string):
  Promise<ProductDetail> => {
  const response = await axiosInstance.get(`client/products/${slug}`);
  return response.data.data;
};
