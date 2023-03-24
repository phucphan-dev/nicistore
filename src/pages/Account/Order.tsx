import React, { useState } from 'react';

import orderDummy from 'assets/dummy/order';
import Button from 'components/atoms/Button';
import Typography from 'components/atoms/Typography';
import OrderDetail from 'components/templates/OrderDetail';
import { OrderData } from 'services/order/types';
import { getDayString, renderPrice } from 'utils/functions';

const Order: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [detail, setDetail] = useState<OrderData>();

  const orderList: OrderData[] = [orderDummy];

  return (
    <div className="p-account_order">
      {detail ? (
        <>
          <OrderDetail {...detail} />
          <div className="p-account_order_button">
            <Button variant="primary" handleClick={() => setDetail(undefined)}>Quay lại</Button>
          </div>
        </>
      ) : (
        <table>
          <thead>
            <td><Typography.Text modifiers={['700']}>Mã đơn hàng</Typography.Text></td>
            <td><Typography.Text modifiers={['700']}>Ngày đặt hàng</Typography.Text></td>
            <td><Typography.Text modifiers={['700']}>Trạng thái</Typography.Text></td>
            <td><Typography.Text modifiers={['700']}>Tổng đơn</Typography.Text></td>
            <td><Typography.Text modifiers={['700']} /></td>
          </thead>
          <tbody>
            {orderList.map((item) => (
              <tr>
                <td>
                  <Typography.Text>
                    #
                    {item.code}
                  </Typography.Text>
                </td>
                <td><Typography.Text>{getDayString(new Date(item.createdAt))}</Typography.Text></td>
                <td><Typography.Text>{item.status}</Typography.Text></td>
                <td><Typography.Text>{renderPrice(item.items.reduce((prev, curr) => prev + curr.finalPrice, 0), true, 'VNĐ')}</Typography.Text></td>
                <td><Button variant="primary" handleClick={() => setDetail(item)}>Xem</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;
