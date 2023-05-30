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

export interface ProductCategoryColor {
  colorId: number
  name: string
  code: string
}

export interface ProductCategorySize {
  sizeId: number
  name: string
  code: string
}

export interface ProductCategoryDetail {
  id: number
  parentId: any
  status: number
  createdAt: string
  updatedAt: string
  name: string
  slug: string
  products: {
    id: number
    thumbnail: string
    code: string
    price: number
    salePrice: number
    stock: number
    name: string
    slug: string
    shortDescription: string
  }[]
  sizes: ProductCategorySize[]
  colors: ProductCategoryColor[]
  seoData: SeoData
}

export interface ProductListItemData {
  id: number
  code: string
  thumbnail: string
  isFavorited: boolean;
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

export interface PropertiesProductFilter {
  sizeIds?: string;
  colorIds?: string;
  fromPrice?: number;
  toPrice?: number;
  stock?: boolean;
  order?: boolean;
  hasSale?: boolean;
}

export interface FilterProductParams extends BaseFilterParams,
  FilterSortParams, PropertiesProductFilter {
  categoryIds?: string;
  featured?: boolean;
  isBestSeller?: boolean;
}

export interface RelatedProductData {
  id: number
  thumbnail: string
  code: string
  price: number
  salePrice: number
  stock: number
  name: string
  slug: string
  shortDescription: string
  isFavorited: boolean
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
  breadcrumbs: Breadcrumb[]
  colors: ProductProperty[]
  sizes: ProductProperty[]
  colorSize: ColorSize[]
  relateds: RelatedProductData[]
  isFavorited: boolean
}
