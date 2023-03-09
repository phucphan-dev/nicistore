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
  count: number;
}
interface SizeFilter {
  code: string;
  label: string;
  count: number;
}

type RatioImage = '1531x541' | '75x46' | '1x1' | '272x289' | '34x17' | '257x274';
