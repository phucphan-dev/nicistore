import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Select from 'components/atoms/Select';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import CustomModal from 'components/organisms/Modal';
import Section from 'components/organisms/Section';
import ShippingAddressList from 'pages/Account/ShippingAddress';

const Checkout: React.FC = () => (
  <Section>
    <div className="p-checkout">
      <Container>
        <Row>
          <Col lg={8} className="p-checkout_address">
            <div className="p-checkout_address_title">
              <Typography.Heading type="h3" modifiers={['18x21']}>Địa chỉ giao hàng</Typography.Heading>
              <Button iconName="location" iconSize="20"><Typography.Text modifiers={['16x18', '500']}>Chọn địa chỉ đã lưu</Typography.Text></Button>
            </div>
            <div className="p-checkout_line">
              <Input required label="Họ và tên" bordered />
            </div>
            <div className="p-checkout_line">
              <Select name="city" placeholder="Vui lòng chọn" required label="Tỉnh / Thành Phố" options={[]} modifier={['bordered']} />
            </div>
            <div className="p-checkout_line">
              <Select name="district" placeholder="Vui lòng chọn" required label="Quận / Huyện" options={[]} modifier={['bordered']} />
            </div>
            <div className="p-checkout_line">
              <Select name="ward" placeholder="Vui lòng chọn" required label="Phường / Xã" options={[]} modifier={['bordered']} />
            </div>
            <div className="p-checkout_line">
              <Input required label="Địa chỉ" type="text" bordered />
            </div>
            <div className="p-checkout_line">
              <Input required label="Số điện thoại" bordered />
            </div>
            <div className="p-checkout_line">
              <Input required label="Email" bordered />
            </div>
            <div className="p-checkout_line">
              <TextArea label="Ghi chú" rows={6} />
            </div>
          </Col>
          <Col lg={4} className="p-checkout_info">
            <div className="p-checkout_total">
              <Typography.Heading type="h3" modifiers={['18x21']}>Your order</Typography.Heading>
              <div className="p-checkout_summary">
                <Typography.Text modifiers={['13x16', '600']}>Product</Typography.Text>
                <Typography.Text modifiers={['13x16', '600']}>Subtotal</Typography.Text>
              </div>
              <div className="p-checkout_divider" />
              <div className="p-checkout_summary">
                <div className="p-checkout_product">
                  <Typography.Text modifiers={['13x16']}>
                    Basic Colored Sweatpants With Elastic Hems
                    {' '}
                    <Typography.Text modifiers={['13x16', '700']} type="span">x 1</Typography.Text>
                  </Typography.Text>
                  <Typography.Text modifiers={['14x16']} type="span">
                    Color:
                    {' '}
                    <Typography.Text modifiers={['600']} type="span">Black</Typography.Text>
                  </Typography.Text>
                  <Typography.Text modifiers={['14x16']} type="span">
                    , Size:
                    {' '}
                    <Typography.Text modifiers={['600']} type="span">White</Typography.Text>
                  </Typography.Text>
                </div>
                <div className="p-checkout_price">
                  <Typography.Text modifiers={['15x18']}>$19.90</Typography.Text>
                </div>
              </div>
              <div className="p-checkout_summary">
                <div className="p-checkout_product">
                  <Typography.Text modifiers={['13x16']}>
                    Basic Colored Sweatpants With Elastic Hems
                    {' '}
                    <Typography.Text modifiers={['13x16', '700']} type="span">x 1</Typography.Text>
                  </Typography.Text>
                  <Typography.Text modifiers={['14x16']} type="span">
                    Color:
                    {' '}
                    <Typography.Text modifiers={['600']} type="span">Black</Typography.Text>
                  </Typography.Text>
                  <Typography.Text modifiers={['14x16']} type="span">
                    , Size:
                    {' '}
                    <Typography.Text modifiers={['600']} type="span">White</Typography.Text>
                  </Typography.Text>
                </div>
                <div className="p-checkout_price">
                  <Typography.Text modifiers={['15x18']}>$19.90</Typography.Text>
                </div>
              </div>
              <div className="p-checkout_summary">
                <div className="p-checkout_product">
                  <Typography.Text modifiers={['13x16']}>
                    Basic Colored Sweatpants With Elastic Hems
                    {' '}
                    <Typography.Text modifiers={['13x16', '700']} type="span">x 1</Typography.Text>
                  </Typography.Text>
                  <Typography.Text modifiers={['14x16']} type="span">
                    Color:
                    {' '}
                    <Typography.Text modifiers={['600']} type="span">Black</Typography.Text>
                  </Typography.Text>
                  <Typography.Text modifiers={['14x16']} type="span">
                    , Size:
                    {' '}
                    <Typography.Text modifiers={['600']} type="span">White</Typography.Text>
                  </Typography.Text>
                </div>
                <div className="p-checkout_price">
                  <Typography.Text modifiers={['15x18']}>$19.90</Typography.Text>
                </div>
              </div>
              <div className="p-checkout_divider" />
              <div className="p-checkout_summary">
                <Typography.Text modifiers={['13x16', '600']}>Subtotal</Typography.Text>
                <Typography.Text modifiers={['15x18']}>$185.39</Typography.Text>
              </div>
              <div className="p-checkout_divider" />
              <div className="p-checkout_summary">
                <Typography.Text modifiers={['13x16', '600']}>Shipping</Typography.Text>
                <Typography.Text modifiers={['15x18']}>$12</Typography.Text>
              </div>
              <div className="p-checkout_divider" />
              <div className="p-checkout_summary">
                <Typography.Text modifiers={['13x16', '600']}>Total</Typography.Text>
                <Typography.Text modifiers={['15x18']}>$200</Typography.Text>
              </div>
              <div className="p-checkout_button">
                <Button variant="primary" sizes="h48">Place order</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <CustomModal isOpen variant="shipping" showIconClose>
      <ShippingAddressList isModal />
    </CustomModal>
  </Section>
);

export default Checkout;
