type RatioImage = '1531x541' | '75x46' | '1x1' | '272x289' | '34x17' | '257x274' | '605x480' | '921x329' | '96x23' | '16x9' | '1366x684' | '2x3';
interface CollectionData {
  subtitle?: string;
  title?: string;
  description?: string;
  thumbnail: string;
  href?: string;
}
interface CategoryData {
  code: string;
  name: string;
  childrens?: CategoryData[];
}
interface ColorFilter {
  code: string;
  label: string;
  color: string;
  count?: number;
}
interface SizeFilter {
  code: string;
  label: string;
  count?: number;
}

interface OptionType {
  value: any;
  label: string;
}
interface BreadcrumbTypes {
  text: string;
  slug?: string;
  target?: string;
}

interface ProductInfo {
  id: number;
  slug: string;
  code: string;
  images: string[];
  name: string;
  description: string;
  promo?: number;
  price: number;
  unit: string;
  starCount?: number;
  reviewCount?: number;
  colorSize?: ColorSize[];
  sku?: string;
  categories?: string[];
  tags?: string[];
}

interface CartItem {
  id: number;
  productId: number;
  image: string;
  link: string;
  name: string;
  color: ProductProperty;
  size: ProductProperty;
  quantity: number;
  price: number;
}

type Color = {
  id: number;
  label: string;
  color: string;
};

type ColorWithSize = {
  [key: string]: {
    color: Color;
    size: ProductProperty[]
  }
};
