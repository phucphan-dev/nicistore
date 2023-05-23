import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { Col, Row } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Checkbox from 'components/atoms/Checkbox';
// import Input from 'components/atoms/Input';
import Typography from 'components/atoms/Typography';
import QuantityInput from 'components/molecules/QuantityInput';
import Container from 'components/organisms/Container';
import CustomModal from 'components/organisms/Modal';
import ProductCartItem from 'components/organisms/ProductCartItem';
import Section from 'components/organisms/Section';
import { removeItemCartService, updateItemCartService } from 'services/cart';
import { AddCartDataRequest } from 'services/cart/types';
import { deleteItemCartLocal, processCheckoutAction, updateItemCartLocal } from 'store/cart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LOCALSTORAGE, ROUTES_PATH } from 'utils/constants';
import { renderPrice } from 'utils/functions';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.auth.profile);
  const cartDetail = useAppSelector((state) => state.cart.items);
  const [checkList, setCheckList] = useState<number[]>([]);
  const [removeId, setRemoveId] = useState<number | undefined>();

  const handleSelectItem = useCallback((id: number, checked: boolean) => {
    if (checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter((item) => item !== id));
    }
  }, [checkList]);

  const { mutate: updateItemCartMutate } = useMutation(
    'updateItemCartAction',
    (params: {
      id: number,
      params: AddCartDataRequest
    }) => updateItemCartService(params.id, params.params),
  );

  const { mutate: removeItemCartMutate } = useMutation(
    'removeItemCartAction',
    removeItemCartService,
  );

  const totalCost = useMemo(() => cartDetail.filter((
    item
  ) => checkList.includes(item.id)).reduce((prev, curr) => prev
    + ((curr.salePrice || curr.price) * curr.quantity), 0), [cartDetail, checkList]);

  const totalCostPromo = useMemo(() => cartDetail.filter((
    item
  ) => checkList.includes(item.id)).reduce(
    (prev, curr) => prev
      + ((curr.salePrice ? (curr.price - curr.salePrice) : 0) * curr.quantity),
    0
  ), [cartDetail, checkList]);

  const handleChangeQuantity = (cartItem: CartItem, quantity: number) => {
    if (quantity === 0) {
      setRemoveId(cartItem.id);
      // dispatch(deleteItemCartLocal(cartItem.id));
      // if (profile) {
      //   removeItemCartMutate([cartItem.id]);
      // }
    } else {
      dispatch(updateItemCartLocal({ ...cartItem, quantity }));
      if (profile) {
        updateItemCartMutate({
          id: cartItem.id,
          params: {
            productId: cartItem.productId,
            sizeId: cartItem.size.id,
            colorId: cartItem.color.id,
            quantity
          }
        });
      }
    }
  };

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteItemCartLocal(id));
    const cartLocal = localStorage.getItem(LOCALSTORAGE.NICI_CART);
    const cartData = cartLocal ? JSON.parse(cartLocal) as CartItem[] : [];
    if (profile) {
      removeItemCartMutate([id]);
    } else {
      localStorage.setItem(
        LOCALSTORAGE.NICI_CART,
        JSON.stringify(cartData.filter((item) => item.id !== id))
      );
    }
    setCheckList(((cl) => cl.filter((item) => item !== id)));
    setRemoveId(undefined);
  }, [dispatch, profile, removeItemCartMutate]);

  const processCheckout = () => {
    if (checkList.length <= 20) {
      dispatch(processCheckoutAction(checkList));
      navigate(ROUTES_PATH.CHECKOUT);
    } else {
      toast.error('Vui lòng không đặt quá 20 sản phẩm', { toastId: 'overOrder' });
    }
  };

  useEffect(() => {
    if (checkList.length === 0) {
      setCheckList(cartDetail.map((item) => item.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartDetail]);

  return (
    <Section>
      <div className="p-cart">
        <Container>
          {cartDetail.length === 0
            ? <Typography.Text modifiers={['center']}>Không có sản phẩm nào trong giỏ hàng</Typography.Text>
            : (
              <Row>
                <Col lg={8}>
                  <table className="p-cart_table">
                    <tr className="p-cart_t">
                      <th>
                        <div className="p-cart_th checkAll">
                          <Checkbox
                            name="checkAll"
                            checked={checkList.length === cartDetail.length}
                            onChange={(e) => (e.currentTarget.checked
                              ? setCheckList(cartDetail.map((item) => item.id)) : setCheckList([]))}
                          />
                        </div>

                      </th>
                      <th><div className="p-cart_th"><Typography.Text>Sản phẩm</Typography.Text></div></th>
                      <th><div className="p-cart_th price"><Typography.Text>Giá</Typography.Text></div></th>
                      <th><div className="p-cart_th"><Typography.Text>Số lượng</Typography.Text></div></th>
                      <th><div className="p-cart_th price"><Typography.Text>Tạm tính</Typography.Text></div></th>
                    </tr>
                    {cartDetail.map((item) => (
                      <tr className="p-cart_t" key={item.name + item.link}>
                        <td>
                          <div className="p-cart_td">
                            <Checkbox
                              name={String(item.id)}
                              checked={checkList.includes(item.id)}
                              onChange={(e) => handleSelectItem(item.id, e.currentTarget.checked)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="p-cart_td">
                            <ProductCartItem
                              image={item.image}
                              href={`${ROUTES_PATH.PRODUCT_DETAIL}/${item.link}`}
                              name={item.name}
                              color={item.color.name}
                              size={item.size.name}
                              isOrder={item.isOrder}
                              handleDelete={() => setRemoveId(item.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="p-cart_td price">
                            <Typography.Text modifiers={item.salePrice ? ['lineThrough', '14x16', 'ashGrey'] : undefined}>
                              {renderPrice(item.price, true, 'VNĐ')}
                            </Typography.Text>
                            {item.salePrice && (
                              <Typography.Text>
                                {renderPrice(item.salePrice, true, 'VNĐ')}
                              </Typography.Text>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="p-cart_td">
                            <QuantityInput
                              initQuantity={item.quantity}
                              handleChange={(value) => handleChangeQuantity(item, value)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="p-cart_td price">
                            <Typography.Text>
                              {renderPrice(item.salePrice || item.price, true, 'VNĐ')}
                            </Typography.Text>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                  {/* <div className="p-cart_coupon">
                    <div className="p-cart_coupon_input">
                      <Input placeholder="Mã giảm giá" bordered />
                    </div>
                    <div className="p-cart_coupon_button">
                      <Button variant="secondary" sizes="h42">Áp dụng</Button>
                    </div>
                  </div> */}
                </Col>
                <Col lg={4}>
                  <div className="p-cart_total">
                    <Typography.Heading type="h2" modifiers={['16x18', '600']}>Chi tiết giỏ hàng</Typography.Heading>
                    <div className="p-cart_divider" />
                    <div className="p-cart_line">
                      <Typography.Text modifiers={['14x16', '400']}>Tổng sản phẩm</Typography.Text>
                      <Typography.Text modifiers={['14x16', '400']}>{renderPrice(totalCost, true, 'VNĐ')}</Typography.Text>
                    </div>
                    <div className="p-cart_divider" />
                    <div className="p-cart_line">
                      <Typography.Text modifiers={['14x16', '400']}>Giảm giá</Typography.Text>
                      <Typography.Text modifiers={['14x16', '400']}>
                        {
                          totalCostPromo ? `- ${renderPrice(totalCostPromo, true, 'VNĐ')}` : '0 VNĐ'
                        }
                      </Typography.Text>
                    </div>
                    <div className="p-cart_divider" />
                    <div className="p-cart_line">
                      <Typography.Text modifiers={['16x18', '700']}>Tổng đơn hàng</Typography.Text>
                      <Typography.Text modifiers={['20x24', '700']}>{renderPrice(totalCost, true, 'VNĐ')}</Typography.Text>
                    </div>
                    <div className="p-cart_total_button">
                      <Button variant="primary" sizes="h48" disabled={checkList.length === 0} handleClick={processCheckout}>Tiến hành đặt hàng</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
        </Container>
        <CustomModal isOpen={!!removeId} variant="notification">
          <Typography.Text modifiers={['18x21', '500', 'center']}>Bạn có muốn xóa sản phẩm này không?</Typography.Text>
          <div className="p-cart_buttons">
            <Button
              variant="secondary"
              sizes="h48"
              disabled={checkList.length === 0}
              handleClick={() => removeId && handleDelete(removeId)}
            >
              Có
            </Button>
            <Button
              variant="primary"
              sizes="h48"
              disabled={checkList.length === 0}
              handleClick={() => setRemoveId(undefined)}
            >
              Không
            </Button>
          </div>
        </CustomModal>
      </div>
    </Section>
  );
};

export default Cart;
