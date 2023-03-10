type RatioImage = '1531x541' | '75x46' | '1x1' | '272x289' | '34x17' | '257x274' | '605x480' | '921x329';
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
  code: string;
  images: string[];
  name: string;
  description: string;
  promo?: number;
  price: number;
  unit: string;
  starCount?: number;
  reviewCount?: number;
  colors?: ColorFilter[];
  sizes?: SizeFilter[];
  sku?: string;
  categories?: string[];
  tags?: string[];
}
