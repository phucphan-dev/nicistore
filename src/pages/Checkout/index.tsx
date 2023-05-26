import { yupResolver } from '@hookform/resolvers/yup';
import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { Col, Row } from 'react-bootstrap';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import momo from 'assets/images/momo.jpg';
import vcb from 'assets/images/vcb.jpg';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import Radio from 'components/atoms/Radio';
import Select from 'components/atoms/Select';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import CustomModal from 'components/organisms/Modal';
import Section from 'components/organisms/Section';
import useDidMount from 'hooks/useDidMount';
import ShippingAddressList from 'pages/Account/ShippingAddress';
import { removeItemCartService } from 'services/cart';
import {
  getLocationCitiesService, getLocationDistrictsService,
  getLocationWardsService
} from 'services/location';
import { createOrderService, createOrderUnAuthService } from 'services/order';
import { CreateOrderDataRequest } from 'services/order/types';
import { ShippingAddressData } from 'services/shippingAddress/types';
import { deleteCheckoutId } from 'store/cart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LOCALSTORAGE, ROUTES_PATH } from 'utils/constants';
import { renderPrice } from 'utils/functions';
import { orderSchema } from 'utils/schemas';

type OrderForm = Omit<CreateOrderDataRequest, 'items'>;

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { checkoutId, items } = useAppSelector((state) => state.cart);
  const profile = useAppSelector((state) => state.auth.profile);
  const [isOpen, setIsOpen] = useState(false);
  const [methodModal, setMethodModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pMethod, setPMethod] = useState('cod');
  const [copied, setCopied] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [preOrderCode, setPreOrderCode] = useState('');

  const orderMethod = useForm<OrderForm>({
    resolver: yupResolver(orderSchema),
  });

  const watchCity = orderMethod.watch('cityId');
  const watchDistrict = orderMethod.watch('districtId');

  const checkoutItems = useMemo(() => (items.filter((
    item
  ) => checkoutId.includes(item.id))), [checkoutId, items]);

  const totalCost = useMemo(() => checkoutItems.reduce((prev, curr) => prev
    + ((curr.price) * curr.quantity), 0), [checkoutItems]);

  const lastCost = useMemo(() => checkoutItems.reduce((prev, curr) => prev
    + ((curr.salePrice || curr.price) * curr.quantity), 0), [checkoutItems]);

  const totalCostPromo = useMemo(() => checkoutItems.reduce((prev, curr) => prev
    + ((curr.salePrice ? (curr.price - curr.salePrice) : 0) * curr.quantity), 0), [checkoutItems]);

  const { mutate: getCitiesMutate, data: cities } = useMutation(
    'getCitiesAction',
    (countryId: number) => getLocationCitiesService(countryId),
  );

  const { mutate: getDistrictsMutate, data: districts } = useMutation(
    'getDistrictsAction',
    (cityId: number) => getLocationDistrictsService(cityId),
  );

  const { mutate: getWardsMutate, data: wards } = useMutation(
    'getWardsAction',
    (districtId: number) => getLocationWardsService(districtId),
  );

  const { mutate: removeItemCartMutate } = useMutation(
    'removeItemCartAction',
    removeItemCartService,
  );

  const handleSuccess = () => {
    setSuccess(true);
    dispatch(deleteCheckoutId());
    if (profile) {
      removeItemCartMutate(checkoutId);
    } else {
      const cartLocal = localStorage.getItem(LOCALSTORAGE.NICI_CART);
      const cartData = cartLocal ? JSON.parse(cartLocal) as CartItem[] : [];
      localStorage.setItem(
        LOCALSTORAGE.NICI_CART,
        JSON.stringify(cartData.filter((item) => !checkoutId.includes(item.id)))
      );
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { mutate: createOrderMutate, isLoading } = useMutation(
    'createOrderAction',
    profile ? createOrderService : createOrderUnAuthService,
    {
      onSuccess: (data, variables) => {
        if (variables.paymentMethod === 'cod') {
          handleSuccess();
        } else {
          setMethodModal(true);
        }
        if (data.code) {
          setOrderCode(data.code);
        }
        if (data.preOrderCode) {
          setPreOrderCode(data.preOrderCode);
        }
      },
      onError: () => {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau!', { toastId: 'orderFail' });
      }
    }
  );

  const handleSelectAddress = (address: ShippingAddressData) => {
    orderMethod.setValue('cityId', address.city.id);
    orderMethod.setValue('districtId', address.district.id);
    orderMethod.setValue('wardId', address.ward.id);
    orderMethod.setValue('address', address.address);
    orderMethod.setValue('phone', address.phone);
    orderMethod.setValue('name', address.name);
    setIsOpen(false);
  };

  const orderAction = useCallback(async () => {
    const valid = await orderMethod.trigger();
    if (valid) {
      const information = orderMethod.getValues();
      createOrderMutate({
        ...information,
        paymentMethod: pMethod,
        items: checkoutItems.filter((item) => !item.isOrder).map((item) => ({
          productId: item.productId,
          sizeId: item.size.id,
          colorId: item.color.id,
          quantity: item.quantity
        })),
        itemOrders: checkoutItems.filter((item) => item.isOrder).map((item) => ({
          productId: item.productId,
          sizeId: item.size.id,
          colorId: item.color.id,
          quantity: item.quantity
        }))
      });
    }
  }, [checkoutItems, createOrderMutate, orderMethod, pMethod]);

  useDidMount(() => {
    getCitiesMutate(1);
  });

  useEffect(() => {
    if (watchCity) {
      getDistrictsMutate(watchCity);
    }
  }, [getDistrictsMutate, orderMethod, watchCity]);

  useEffect(() => {
    if (watchDistrict) {
      getWardsMutate(watchDistrict);
    }
  }, [getWardsMutate, orderMethod, watchDistrict]);

  return (
    <Section>
      <div className="p-checkout">
        <Container>
          {success ? (
            <>
              <div className="p-checkout_success">
                <div className="p-checkout_success-icon">
                  <div className="p-checkout_success-icon_tip" />
                  <div className="p-checkout_success-icon_long" />
                </div>
              </div>
              {orderCode && (
                <Typography.Text modifiers={['mayGreen', '700', '20x24', 'center']}>
                  Đặt hàng thành công. Theo dõi đơn hàng của bạn
                  {' '}
                  <Link href={`${ROUTES_PATH.TRACKING_ORDER}?code=${orderCode}`}><Typography.Text type="span" modifiers={['underline']}>tại đây</Typography.Text></Link>
                </Typography.Text>
              )}
              {preOrderCode && (
                <Typography.Text modifiers={['mayGreen', '700', '20x24', 'center']}>
                  Đặt hàng thành công. Theo dõi đơn hàng đặt trước của bạn
                  {' '}
                  <Link href={`${ROUTES_PATH.TRACKING_ORDER}?code=${orderCode}`}><Typography.Text type="span" modifiers={['underline']}>tại đây</Typography.Text></Link>
                </Typography.Text>
              )}
              <div className="p-checkout_button continue">
                <Button variant="primary" sizes="h48" handleClick={() => navigate(ROUTES_PATH.HOME)}>Tiếp tục mua hàng</Button>
              </div>
            </>
          ) : (
            <FormProvider {...orderMethod}>
              <Row>
                <Col lg={8} className="p-checkout_address">
                  <div className="p-checkout_address_title">
                    <Typography.Heading type="h3" modifiers={['18x21']}>Địa chỉ giao hàng</Typography.Heading>
                    {profile && (
                      <Button iconName="location" iconSize="20" handleClick={() => setIsOpen(true)}>
                        <Typography.Text modifiers={['16x18', '500']}>Chọn địa chỉ đã lưu</Typography.Text>
                      </Button>
                    )}
                  </div>
                  <div className="p-account_field">
                    <Controller
                      name="name"
                      control={orderMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input name="name" required label="Tên người nhận" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                      )}
                    />
                  </div>
                  <div className="p-account_field">
                    <Controller
                      name="phone"
                      control={orderMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input name="phone" required label="Số điện thoại" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                      )}
                    />
                  </div>
                  <div className="p-account_field">
                    <Controller
                      name="cityId"
                      control={orderMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Select
                          isSearch
                          name="cityId"
                          placeholder="---"
                          label="Tỉnh / Thành phố"
                          options={cities || []}
                          modifier={['bordered']}
                          required
                          value={cities?.find((item) => item.value === value)}
                          handleSelect={(option) => onChange(option.value)}
                          error={error?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="p-account_field">
                    <Controller
                      name="districtId"
                      control={orderMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Select
                          isSearch
                          name="districtId"
                          placeholder="---"
                          label="Quận / Huyện"
                          options={districts || []}
                          modifier={['bordered']}
                          required
                          value={districts?.find((item) => item.value === value)}
                          handleSelect={(option) => onChange(option.value)}
                          error={error?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="p-account_field">
                    <Controller
                      name="wardId"
                      control={orderMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Select
                          isSearch
                          name="wardId"
                          placeholder="---"
                          label="Phường / Xã"
                          options={wards || []}
                          modifier={['bordered']}
                          required
                          value={wards?.find((item) => item.value === value)}
                          handleSelect={(option) => onChange(option.value)}
                          error={error?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="p-account_field">
                    <Controller
                      name="address"
                      control={orderMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input name="address" required label="Địa chỉ" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                      )}
                    />
                  </div>
                  <div className="p-checkout_line">
                    <Controller
                      name="email"
                      control={orderMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <Input name="email" label="Email" type="text" value={value} bordered onChange={onChange} error={error?.message} />
                      )}
                    />
                  </div>
                  <div className="p-checkout_line">
                    <Controller
                      name="note"
                      control={orderMethod.control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextArea name="note" label="Ghi chú" rows={6} value={value} onChange={onChange} error={error?.message} />
                      )}
                    />
                  </div>
                </Col>
                <Col lg={4} className="p-checkout_info">
                  <div className="p-checkout_total">
                    <Typography.Heading type="h3" modifiers={['18x21']}>Chi tiết đơn hàng</Typography.Heading>
                    <div className="p-checkout_summary">
                      <Typography.Text modifiers={['16x18', '600']}>Sản phẩm</Typography.Text>
                      <Typography.Text modifiers={['16x18', '600']}>Giá</Typography.Text>
                    </div>
                    <div className="p-checkout_divider" />
                    {checkoutItems.map((item) => (
                      <div className="p-checkout_summary" key={item.id}>
                        <div className="p-checkout_product">
                          <Typography.Text modifiers={['16x18', '700']}>
                            {item.name}
                            {' '}
                            x
                            {' '}
                            {item.quantity}
                          </Typography.Text>
                          <Typography.Text modifiers={['14x16']} type="span">
                            Color:
                            {' '}
                            {item.color.name}
                          </Typography.Text>
                          <Typography.Text modifiers={['14x16']} type="span">
                            , Size:
                            {' '}
                            {item.size.name}
                          </Typography.Text>
                          {item.isOrder && (
                            <Typography.Text modifiers={['14x16', '500', 'ferrariRed']} type="p">
                              Đặt trước
                            </Typography.Text>
                          )}
                        </div>
                        <div className="p-checkout_price">
                          <Typography.Text modifiers={item.salePrice ? ['lineThrough', '13x16'] : ['15x18', '600']}>{renderPrice(item.price * item.quantity, true, 'VNĐ')}</Typography.Text>
                          {item.salePrice && <Typography.Text modifiers={['15x18', '600']}>{renderPrice(item.salePrice * item.quantity, true, 'VNĐ')}</Typography.Text>}
                        </div>
                      </div>
                    ))}
                    <div className="p-checkout_divider" />
                    <div className="p-checkout_summary">
                      <Typography.Text modifiers={['16x18']}>Tổng tiền sản phẩm</Typography.Text>
                      <Typography.Text modifiers={['15x18', '600']}>{renderPrice(totalCost, true, 'VNĐ')}</Typography.Text>
                    </div>
                    <div className="p-checkout_divider" />
                    <div className="p-checkout_summary">
                      <Typography.Text modifiers={['16x18']}>Giảm giá</Typography.Text>
                      <Typography.Text modifiers={['15x18', '600']}>
                        {
                          totalCostPromo ? `- ${renderPrice(totalCostPromo, true, 'VNĐ')}` : '0 VNĐ'
                        }
                      </Typography.Text>
                    </div>
                    <div className="p-checkout_divider" />
                    <div className="p-checkout_summary">
                      <Typography.Text modifiers={['16x18']}>Tổng đơn hàng</Typography.Text>
                      <Typography.Text modifiers={['15x18', '600']}>{renderPrice(lastCost, true, 'VNĐ')}</Typography.Text>
                    </div>
                    <div className="p-checkout_payment">
                      <div className="p-checkout_payment_item">
                        <Radio
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={pMethod === 'cod'}
                          text="Thanh toán khi nhận hàng"
                          onChange={(e) => setPMethod(e.currentTarget.value)}
                        />
                      </div>
                      <div className="p-checkout_payment_item">
                        <Radio
                          type="radio"
                          name="payment"
                          value="momo"
                          checked={pMethod === 'momo'}
                          text="Thanh toán qua Momo"
                          onChange={(e) => setPMethod(e.currentTarget.value)}
                        />
                      </div>
                      <div className="p-checkout_payment_item">
                        <Radio
                          type="radio"
                          name="payment"
                          value="banking"
                          checked={pMethod === 'banking'}
                          text="Chuyển khoản ngân hàng"
                          onChange={(e) => setPMethod(e.currentTarget.value)}
                        />
                      </div>
                    </div>
                    <div className="p-checkout_button">
                      <Button
                        variant="primary"
                        loading={isLoading}
                        sizes="h48"
                        handleClick={orderAction}
                      >
                        Đặt hàng
                      </Button>
                      <Button
                        variant="secondary"
                        loading={isLoading}
                        sizes="h48"
                        handleClick={() => navigate('/cart')}
                      >
                        Quay lại giỏ hàng
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </FormProvider>
          )}
        </Container>
      </div>
      <CustomModal isOpen={isOpen} variant="shipping" showIconClose handleClose={() => setIsOpen(false)}>
        <ShippingAddressList isModal handleSelectAddress={handleSelectAddress} />
      </CustomModal>
      <CustomModal isOpen={methodModal} variant="shipping">
        <div className="p-checkout_payment_info">
          <div className="p-checkout_payment_qr">
            <div className="p-checkout_total">
              <Typography.Heading type="h3" modifiers={['18x21']}>Thông tin đơn hàng</Typography.Heading>
              <div className="p-checkout_divider" />
              <div className="p-checkout_summary">
                <Typography.Text modifiers={['16x18']}>Tổng tiền sản phẩm</Typography.Text>
                <Typography.Text modifiers={['15x18', '600']}>{renderPrice(totalCost, true, 'VNĐ')}</Typography.Text>
              </div>
              <div className="p-checkout_divider" />
              <div className="p-checkout_summary">
                <Typography.Text modifiers={['16x18']}>Giảm giá</Typography.Text>
                <Typography.Text modifiers={['15x18', '600']}>
                  {
                    totalCostPromo ? `- ${renderPrice(totalCostPromo, true, 'VNĐ')}` : '0 VNĐ'
                  }
                </Typography.Text>
              </div>
              <div className="p-checkout_divider" />
              <div className="p-checkout_summary">
                <Typography.Text modifiers={['16x18']}>Tổng đơn hàng</Typography.Text>
                <Typography.Text modifiers={['15x18', '600']}>{renderPrice(lastCost, true, 'VNĐ')}</Typography.Text>
              </div>
            </div>
          </div>
          {pMethod === 'momo' && (
            <div className="p-checkout_payment_qr">
              <Image imgSrc={momo} alt="qrMomo" ratio="1x1" />
              <div className="p-checkout_payment_copy">
                <Typography.Text modifiers={['28x32', '500']}>MOMO: 0388197156</Typography.Text>
                <Button
                  iconName="copy"
                  iconSize="32"
                  handleClick={() => {
                    navigator.clipboard.writeText('0388197156');
                    setCopied(true);
                  }}
                />
                {copied && <Typography.Text modifiers={['14x16', '400', 'italic', 'mayGreen']}>Copied!</Typography.Text>}
              </div>
            </div>
          )}
          {pMethod === 'banking' && (
            <div className="p-checkout_payment_qr">
              <Image imgSrc={vcb} alt="qrVCB" ratio="1x1" />
              <div className="p-checkout_payment_copy">
                <Typography.Text modifiers={['28x32', '500']}>STK: 9388197156</Typography.Text>
                <Button
                  iconName="copy"
                  iconSize="32"
                  handleClick={() => {
                    navigator.clipboard.writeText('9388197156');
                    setCopied(true);
                  }}
                />
                {copied && <Typography.Text modifiers={['14x16', '400', 'italic', 'mayGreen']}>Copied!</Typography.Text>}
              </div>
            </div>
          )}
        </div>
        <br />
        <hr />
        <div className="p-checkout_payment_footer">
          <Button
            variant="primary"
            sizes="h48"
            handleClick={() => {
              setMethodModal(false);
              handleSuccess();
            }}
          >
            Đã hoàn thành thanh toán
          </Button>
        </div>
      </CustomModal>
    </Section>
  );
};

export default Checkout;
