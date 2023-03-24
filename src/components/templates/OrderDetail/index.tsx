import React from 'react';

import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import PriceSale from 'components/molecules/PriceSale';
import { OrderData } from 'services/order/types';
import { getDayString, renderPrice } from 'utils/functions';

const OrderDetail: React.FC<OrderData> = ({
  code,
  city,
  district,
  ward,
  name,
  phone,
  email,
  address,
  note,
  createdAt,
  items
}) => (
  <div className="t-orderDetail">
    <Typography.Text>
      Đơn hàng
      {' '}
      <Typography.Text type="span" modifiers={['700']}>
        #
        {code}
      </Typography.Text>
      {' '}
      đã đặt vào
      {' '}
      <strong>{getDayString(new Date(createdAt))}</strong>
    </Typography.Text>
    <table>
      <thead>
        <td><Typography.Text modifiers={['700']}>Sản phẩm</Typography.Text></td>
        <td><Typography.Text modifiers={['700']}>Tổng cộng</Typography.Text></td>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.product.slug + item.product.name}>
            <td>
              <Typography.Text>
                <Link href={item.product.slug}>{item.product.name}</Link>
                {' '}
                <strong>
                  x
                  {item.quantity}
                </strong>
              </Typography.Text>
            </td>
            <td><PriceSale unit="VNĐ" promo={item.salePercent} price={item.price} /></td>
          </tr>
        ))}
        <tr>
          <td><Typography.Text modifiers={['700']}>Tổng đơn</Typography.Text></td>
          <td>
            <Typography.Text modifiers={['700']}>{renderPrice(items.reduce((prev, curr) => prev + curr.finalPrice, 0), true, 'VNĐ')}</Typography.Text>
          </td>
        </tr>
      </tbody>
    </table>
    <div className="t-orderDetail_shipping">
      <div className="t-orderDetail_line">
        <Typography.Text>
          Tên:
          {' '}
          <strong>
            {' '}
            {name}
          </strong>
        </Typography.Text>
      </div>
      <div className="t-orderDetail_line">
        <Typography.Text>
          SĐT:
          {' '}
          <strong>{phone}</strong>
        </Typography.Text>
      </div>
      <div className="t-orderDetail_line">
        <Typography.Text>
          Email:
          {' '}
          <strong>{email}</strong>
        </Typography.Text>
      </div>
      <div className="t-orderDetail_line">
        <Typography.Text>
          Địa chỉ:
          {' '}
          <strong>
            {address}
            ,
            {' '}
            {ward.name}
            ,
            {' '}
            {district.name}
            ,
            {' '}
            {city.name}
          </strong>
        </Typography.Text>
      </div>
      <div className="t-orderDetail_line">
        <Typography.Text>
          Ghi chú:
          {' '}
          {note}
        </Typography.Text>
      </div>
    </div>
  </div>
);

export default OrderDetail;
