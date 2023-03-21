export interface LocationCityData {
  id: number;
  countryId: number;
  active: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  locale: string;
  regionId: any;
  name: string;
}

export interface LocationDistrictData {
  id: number;
  cityId: number;
  active: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  locale: string;
  name: string;
}

export interface LocationWardData {
  id: number;
  districtId: number;
  active: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  locale: string;
  name: string;
}
