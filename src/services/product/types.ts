export interface ProductCategoryData {
  id: number
  parentId: number
  status: number
  createdAt: string
  updatedAt: string
  name: string
  slug: string
  displayOrder: number
}

export interface ProductListItemData {
  id: number
  code: string
  thumbnail: string
  price: number
  displayOrder: number
  salePercent: number
  stock: number
  name: string
  slug: string
  shortDescription: string
  categories: Category[]
  colors: ProductProperty[]
  sizes: ProductProperty[]
  colorSize: ColorSize[]
}

export interface FilterSortParams {
  sortBy?: SortBy;
  sortType?: SortType;
}

export interface FilterProductParams extends BaseFilterParams, FilterSortParams {
  categoryIds?: string;
  featured?: boolean;
  isBestSeller?: boolean;
}

export interface ProductDetail {
  id: number
  code: string
  thumbnail: string
  galleries: Gallery[]
  price: number
  salePercent: number
  stock: number
  status: number
  displayOrder: number
  name: string
  slug: string
  shortDescription: string
  description: string
  categories: Category[]
  colors: ProductProperty[]
  sizes: ProductProperty[]
  colorSize: ColorSize[]
}
