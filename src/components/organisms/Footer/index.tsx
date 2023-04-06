/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Container from '../Container';

import logo from 'assets/images/logo.svg';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';

interface FooterProps {
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = () => (
  <footer className="o-footer">
    <Container>
      {/* <Row>
        <Col lg={4}>
          <div className="o-footer_brandInfo">
            <div className="o-footer_logo">
              <Image imgSrc={logo} alt="Logo" ratio="75x46" />
            </div>
            <div className="o-footer_intro">
              <Typography.Text modifiers={['12x14']}>
                Quis ipsum suspendisse ultrices gravida.
                Risus commodo viverra maecenas accumsan lacus vel facilisis in termapol.
              </Typography.Text>
            </div>
            <Typography.Text modifiers={['12x14']}>
              <a href="tel:+84989684624"><Typography.Text type="span"
              modifiers={['12x14']}>0989 684 624 - </Typography.Text></a>
              <a href="tel:+84989157716"><Typography.Text type="span"
              modifiers={['12x14']}>0989 15 77 16</Typography.Text></a>
            </Typography.Text>
            <br />
            <Typography.Text modifiers={['12x14']}>
              nicistore@gmail.com
            </Typography.Text>
          </div>
        </Col>
        <Col lg={2} xs={6}>
          <div className="o-footer_title">
            <Typography.Text modifiers={['16x18', '600']}>Information</Typography.Text>
          </div>
          <div className="o-footer_menu">
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>About Us</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Privacy Policy</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Returns Policy</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Shipping Policy</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Dropshipping</Typography.Text>
              </Link>
            </div>
          </div>
        </Col>
        <Col lg={2} xs={6}>
          <div className="o-footer_title">
            <Typography.Text modifiers={['16x18', '600']}>Account</Typography.Text>
          </div>
          <div className="o-footer_menu">
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Dashboard</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>My Orders</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>My Wishlist</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Account details</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Track My Orders</Typography.Text>
              </Link>
            </div>
          </div>
        </Col>
        <Col lg={2} xs={6}>
          <div className="o-footer_title">
            <Typography.Text modifiers={['16x18', '600']}>Shop</Typography.Text>
          </div>
          <div className="o-footer_menu">
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Affiliate</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Bestsellers</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Discount</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Latest Products</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Sale Products</Typography.Text>
              </Link>
            </div>
          </div>
        </Col>
        <Col lg={2} xs={6}>
          <div className="o-footer_title">
            <Typography.Text modifiers={['16x18', '600']}>Categories</Typography.Text>
          </div>
          <div className="o-footer_menu">
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Women</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Men</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Bags</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Outerwear</Typography.Text>
              </Link>
            </div>
            <div className="o-footer_menu_item">
              <Link>
                <Typography.Text modifiers={['15x18']}>Shoes</Typography.Text>
              </Link>
            </div>
          </div>
        </Col>
      </Row> */}
      <div className="o-footer_content">
        <div className="o-footer_logo">
          <Image imgSrc={logo} alt="Logo" ratio="75x46" />
        </div>
        {/* <div className="o-footer_divider" /> */}
        <Typography.Text modifiers={['13x16']}>
          Copyright
          {' '}
          {new Date().getFullYear()}
          {' '}
          © Nici Store. All right reserved. Powered by MNN.
        </Typography.Text>
      </div>
    </Container>
  </footer>
);

export default Footer;
