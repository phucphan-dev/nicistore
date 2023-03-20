import { AxiosResponse } from 'axios';

import { LocationCityData, LocationDistrictData, LocationWardData } from './types';

import axiosInstance from 'services/common/instance';

export const getLocationCitiesService = async (countryId: number): Promise<OptionType[]> => {
  const response = await axiosInstance.get<AxiosResponse<LocationCityData[]>>(`locations/cities/${countryId}`);
  return response.data.data.map((item) => ({ label: item.name, value: item.id }));
};

export const getLocationDistrictsService = async (
  cityId: number
): Promise<OptionType[]> => {
  const response = await axiosInstance.get<AxiosResponse<LocationDistrictData[]>>(`locations/districts/${cityId}`);
  return response.data.data.map((item) => ({ label: item.name, value: item.id }));
};

export const getLocationWardsService = async (
  districtId: number
): Promise<OptionType[]> => {
  const response = await axiosInstance.get<AxiosResponse<LocationWardData[]>>(`locations/wards/${districtId}`);
  return response.data.data.map((item) => ({ label: item.name, value: item.id }));
};
