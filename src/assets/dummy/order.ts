import { OrderData } from 'services/order/types';

const orderDummy: OrderData = {
  code: '4234234234234',
  status: 1,
  city: {
    id: 1,
    name: 'TP. Hồ Chí Minh'
  },
  district: {
    id: 1,
    name: 'Quận 10'
  },
  ward: {
    id: 1,
    name: 'Phường 13'
  },
  name: 'test',
  phone: '0987646464',
  email: 'test@gmail.com',
  address: '872 Tô Hiến Thành',
  note: 'Ghi chú',
  createdAt: new Date().toISOString(),
  items: [
    {
      product: {
        id: 1,
        thumbnail: '',
        name: 'test product',
        slug: 'test',
        shortDescription: 'test'
      },
      size: {
        id: 1,
        name: 'S',
        code: 'S'
      },
      color: {
        id: 1,
        name: 'Red',
        code: 'red'
      },
      quantity: 3,
      price: 120000,
      salePercent: 10,
      finalPrice: 108000,
    },
    {
      product: {
        id: 1,
        thumbnail: '',
        name: 'test product',
        slug: 'test',
        shortDescription: 'test'
      },
      size: {
        id: 1,
        name: 'S',
        code: 'S'
      },
      color: {
        id: 1,
        name: 'Red',
        code: 'red'
      },
      quantity: 4,
      price: 120000,
      salePercent: 10,
      finalPrice: 108000,
    }
  ],
  totalPrice: 0,
  totalFinalPrice: 0
};

export default orderDummy;
