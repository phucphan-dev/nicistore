import React, { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import QuantityInput from 'components/molecules/QuantityInput';
import Container from 'components/organisms/Container';
import ProductCartItem from 'components/organisms/ProductCartItem';
import Section from 'components/organisms/Section';
import { getDetailCartService } from 'services/cart';
import { useAppSelector } from 'store/hooks';
import { LOCALSTORAGE } from 'utils/constants';
import { renderPrice } from 'utils/functions';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.auth.profile);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useQuery(
    ['getCartDetail'],
    () => {
      if (profile) {
        return getDetailCartService();
      }
      return undefined;
    },
    { enabled: !!profile }
  );
  const cartDetail: CartItem[] = useMemo(() => {
    const cartLocal = localStorage.getItem(LOCALSTORAGE.NICI_CART);
    const cartData = cartLocal ? JSON.parse(cartLocal) as CartItem[] : [];
    if (data) {
      return data.items.map((item) => ({
        image: item.thumbnail,
        link: item.slug,
        name: item.name,
        color: item.colors,
        size: item.sizes,
        quantity: item.quantity,
        price: item.price
      }));
    }
    return cartData;
  }, [data]);
  return (
    <Section>
      <div className="p-cart">
        <Container>
          <Row>
            <Col lg={8}>
              <table className="p-cart_table">
                <tr className="p-cart_t">
                  <th><div className="p-cart_th"><Typography.Text>Product</Typography.Text></div></th>
                  <th><div className="p-cart_th price"><Typography.Text>Price</Typography.Text></div></th>
                  <th><div className="p-cart_th"><Typography.Text>Quantity</Typography.Text></div></th>
                  <th><div className="p-cart_th"><Typography.Text>Subtotal</Typography.Text></div></th>
                </tr>
                {cartDetail.map((item) => (
                  <tr className="p-cart_t" key={item.name + item.link}>
                    <td>
                      <div className="p-cart_td">
                        <ProductCartItem
                          image={item.image}
                          href={item.link}
                          name={item.name}
                          color={item.color.name}
                          size={item.size.name}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="p-cart_td price">
                        <Typography.Text>
                          {renderPrice(item.price, true)}
                          {' '}
                          VNĐ
                        </Typography.Text>
                      </div>
                    </td>
                    <td><div className="p-cart_td"><QuantityInput initQuantity={item.quantity} /></div></td>
                    <td>
                      <div className="p-cart_td">
                        <Typography.Text>
                          {renderPrice(item.price, true)}
                          {' '}
                          VNĐ
                        </Typography.Text>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
              <div className="p-cart_coupon">
                <div className="p-cart_coupon_input">
                  <Input placeholder="Coupon Code" bordered />
                </div>
                <div className="p-cart_coupon_button">
                  <Button variant="secondary" sizes="h42">Apply coupon</Button>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="p-cart_total">
                <Typography.Heading type="h2" modifiers={['16x18', '400']}>Cart Totals</Typography.Heading>
                <div className="p-cart_divider" />
                <div className="p-cart_line">
                  <Typography.Text modifiers={['14x16', '400']}>Subtotal</Typography.Text>
                  <Typography.Text modifiers={['14x16', '400']}>$185.39</Typography.Text>
                </div>
                <div className="p-cart_divider" />
                <div className="p-cart_line">
                  <Typography.Text modifiers={['14x16', '400']}>Shipping</Typography.Text>
                  <Typography.Text modifiers={['14x16', '400']}>$12</Typography.Text>
                </div>
                <div className="p-cart_divider" />
                <div className="p-cart_line">
                  <Typography.Text modifiers={['14x16', '400']}>Total</Typography.Text>
                  <Typography.Text modifiers={['20x24', '700']}>$200</Typography.Text>
                </div>
                <div className="p-cart_total_button">
                  <Button variant="primary" sizes="h48" handleClick={() => navigate('/checkout')}>Proceed to checkout</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Section>
  );
};

export default Cart;
