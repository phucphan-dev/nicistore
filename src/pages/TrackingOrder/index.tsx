import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import Loading from 'components/atoms/Loading';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Section from 'components/organisms/Section';
import OrderDetail from 'components/templates/OrderDetail';
import { getOrderDetailService } from 'services/order';

const TrackingOrder: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get('code');
  const { data: detail, isLoading } = useQuery(
    ['getOrderDetail', orderCode],
    () => {
      if (orderCode) {
        return getOrderDetailService(orderCode);
      }
      return undefined;
    }
  );
  if (isLoading) {
    return <Loading isShow />;
  }

  return (
    <>
      <Helmet>
        <title>Nici Store | Theo dõi đơn hàng</title>
      </Helmet>
      <Section>
        <Container>
          {detail ? <OrderDetail {...detail} /> : <Typography.Text modifiers={['center']}>Không tìm thấy đơn hàng</Typography.Text>}
        </Container>
      </Section>
    </>
  );
};

export default TrackingOrder;
