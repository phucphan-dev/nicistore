import { MenuItem } from 'components/organisms/Menu';

const menuDummy: MenuItem[] = [
  {
    id: 'home',
    text: 'Home',
    link: '/',
  },
  {
    id: 'shop',
    text: 'Shop',
    link: '#',
    childrens: [
      {
        id: 'shoplist',
        text: 'Shop List',
        link: '/#/products',
        childrens: [
          {
            id: 'shoplist1',
            text: 'Shop List 1',
            link: '#',
          },
          {
            id: 'shoplist2',
            text: 'Shop List 2',
            link: '#',
          },
          {
            id: 'shoplist3',
            text: 'Shop List 3',
            link: '#',
          },
          {
            id: 'shoplist4',
            text: 'Shop List 4',
            link: '#',
          },
        ]
      },
      {
        id: 'productdetail',
        text: 'Product Detail',
        link: '/#/product-detail',
        childrens: [
          {
            id: 'productdetail1',
            text: 'Product Detail 1',
            link: '#',
          },
          {
            id: 'productdetail2',
            text: 'Product Detail 2',
            link: '#',
          },
          {
            id: 'productdetail3',
            text: 'Product Detail 3',
            link: '#',
          },
          {
            id: 'productdetail4',
            text: 'Product Detail 4',
            link: '#',
          },
        ]
      },
      {
        id: 'shoppage',
        text: 'Shop Pages',
        link: '#',
        childrens: [
          {
            id: 'shoppage1',
            text: 'Shop Pages 1',
            link: '#',
          },
          {
            id: 'shoppage2',
            text: 'Shop Pages 2',
            link: '#',
          },
          {
            id: 'shoppage3',
            text: 'Shop Pages 3',
            link: '#',
          },
          {
            id: 'shoppage4',
            text: 'Shop Pages 4',
            link: '#',
          },
        ]
      },
      {
        id: 'shoplayout',
        text: 'Shop Layouts',
        link: '#',
        childrens: [
          {
            id: 'shoplayout1',
            text: 'Shop Layouts 1',
            link: '#',
          },
          {
            id: 'shoplayout2',
            text: 'Shop Layouts 2',
            link: '#',
          },
          {
            id: 'shoplayout3',
            text: 'Shop Layouts 3',
            link: '#',
          },
          {
            id: 'shoplayout4',
            text: 'Shop Layouts 4',
            link: '#',
          },
        ]
      },
    ]
  },
  {
    id: 'women',
    text: 'Women',
    link: '#',
  },
  {
    id: 'men',
    text: 'Men',
    link: '#',
  },
  {
    id: 'outerwear',
    text: 'OUTERWEAR',
    link: '#',
  },
  {
    id: 'contact',
    text: 'Contact',
    link: '#',
  },
];

export default menuDummy;
