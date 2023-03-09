const categoriesDummy: CategoryData[] = [
  {
    code: 'men',
    name: 'Men',
    childrens: [
      {
        code: 'shirts',
        name: 'Shirts',
      },
      {
        code: 'shorts',
        name: 'Shorts',
      },
      {
        code: 'tshirts',
        name: 'T-Shirts',
      },
      {
        code: 'jeans',
        name: 'Jeans',
      },
    ]
  },
  {
    code: 'woman',
    name: 'Woman',
    childrens: [
      {
        code: 'shirts1',
        name: 'Shirts',
      },
      {
        code: 'shorts1',
        name: 'Shorts',
      },
      {
        code: 'tshirts1',
        name: 'T-Shirts',
      },
      {
        code: 'jeans1',
        name: 'Jeans',
      },
    ],
  },
  {
    code: 'bags',
    name: 'Bags',
  },
  {
    code: 'shoes',
    name: 'Shoes',
  },
  {
    code: 'accessories',
    name: 'Accessories',
  },
];

export const colorsDummy: ColorFilter[] = [
  {
    code: 'applered',
    label: 'Apple Red',
    color: '#9f1435',
    count: 12,
  },
  {
    code: 'bioblue',
    label: 'Bio Blue',
    color: '#003080',
    count: 20,
  },
  {
    code: 'blue',
    label: 'Blue',
    color: '#6e94bb',
    count: 7,
  },
  {
    code: 'green',
    label: 'Green',
    color: '#016243',
    count: 14,
  },
  {
    code: 'red',
    label: 'Red',
    color: '#ea2630',
    count: 34,
  },
  {
    code: 'black',
    label: 'Black',
    color: '#000000',
    count: 3,
  },
];

export const sizeDummy: SizeFilter[] = [
  {
    code: 'XS',
    label: 'XS',
    count: 5
  },
  {
    code: 'S',
    label: 'S',
    count: 2
  },
  {
    code: 'M',
    label: 'M',
    count: 1
  },
  {
    code: 'L',
    label: 'L',
    count: 4
  },
  {
    code: 'XL',
    label: 'XL',
    count: 8
  },
];

export const productStatusDummy: OptionType[] = [
  {
    value: 'instock',
    label: 'In Stock'
  },
  {
    value: 'onsale',
    label: 'On Sale'
  },
];
export default categoriesDummy;
