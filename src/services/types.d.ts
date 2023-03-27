type ErrorResponse = {
  field: string;
  code: string;
  message: string;
};

type PaginationLinks = {
  self: string;
  first: string;
  prev?: any;
  next?: any;
  last: string;
};

type PaginationMeta = {
  totalPages: number;
  limit: number;
  total: number;
  page: number;
};

type APIPaginationResponse<T> = {
  data: T;
  meta: PaginationMeta;
  links: PaginationLinks;
};

type APartOfLocation = {
  id: number
  name: string
};

type ProductProperty = {
  id: number
  name: string
  code: string
};

type ColorSize = {
  color: ProductProperty
  size: ProductProperty
};

type Category = {
  id: number
  name: string
  slug: string
};

type BaseFilterParams = {
  locale?: string;
  keyword?: string;
  limit?: number;
  page?: number;
};

type SortBy = 'createdAt' | 'price' | 'displayOrder';
type SortType = 'ASC' | 'DESC';

type Gallery = {
  id: string
  alt: string
  path: string
  title: string;
};
