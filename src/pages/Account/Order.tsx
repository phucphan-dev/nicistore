/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Loading from 'components/atoms/Loading';
import Typography from 'components/atoms/Typography';
import Pagination from 'components/organisms/Pagination';
import OrderDetail from 'components/templates/OrderDetail';
import { getAllOrderService } from 'services/order';
import { OrderData } from 'services/order/types';
import { getDayString, renderPrice } from 'utils/functions';

const Order: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [detail, setDetail] = useState<OrderData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page'));
  const [page, setPage] = useState(pageParam || 1);

  const { data: orderList, isLoading } = useQuery(
    ['getAllOrder', page],
    () => getAllOrderService({
      limit: 12,
      page,
    })
  );

  if (isLoading) {
    return <Loading isShow />;
  }

  return (
    <div className="p-account_order">
      {detail ? (
        <>
          <OrderDetail {...detail} />
          <div className="p-account_order_button">
            <Button variant="primary" handleClick={() => setDetail(undefined)}>Quay lại</Button>
          </div>
        </>
      )
        : orderList && orderList.data.length > 0 ? (
          <>
            <table>
              <thead>
                <td><Typography.Text modifiers={['700']}>Mã đơn hàng</Typography.Text></td>
                <td><Typography.Text modifiers={['700']}>Ngày đặt hàng</Typography.Text></td>
                <td><Typography.Text modifiers={['700']}>Trạng thái</Typography.Text></td>
                <td><Typography.Text modifiers={['700']}>Tổng đơn</Typography.Text></td>
                <td><Typography.Text modifiers={['700']} /></td>
              </thead>
              <tbody>
                {orderList.data.map((item) => (
                  <tr>
                    <td>
                      <Typography.Text>
                        #
                        {item.code}
                      </Typography.Text>
                    </td>
                    <td>
                      <Typography.Text>
                        {
                          getDayString(new Date(item.createdAt))
                        }
                      </Typography.Text>
                    </td>
                    <td><Typography.Text>{item.status}</Typography.Text></td>
                    <td><Typography.Text>{renderPrice(item.items.reduce((prev, curr) => prev + curr.finalPrice, 0), true, 'VNĐ')}</Typography.Text></td>
                    <td><Button variant="primary" handleClick={() => setDetail(item)}>Xem</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-products_pagination">
              <Pagination
                totalPage={orderList?.meta.totalPages || 0}
                pageCurrent={page}
                handleChangePage={(val) => {
                  setPage(val);
                  setSearchParams({ page: val.toString() });
                }}
              />
            </div>
          </>
        ) : <Typography.Text modifiers={['center']}>Bạn chưa có đơn hàng nào</Typography.Text>}
    </div>
  );
};

export default Order;
