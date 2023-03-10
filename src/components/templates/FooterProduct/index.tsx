import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Typography from 'components/atoms/Typography';
import ProductCard, { ProductCardProps } from 'components/organisms/ProductCard';

interface FooterProductProps {
  title: string;
  products: ProductCardProps[];
}

const FooterProduct: React.FC<FooterProductProps> = ({ title, products }) => (
  <div className="t-footerProduct">
    <div className="t-footerProduct_title">
      <Typography.Heading type="h4" modifiers={['20x24', '500']}>{title}</Typography.Heading>
    </div>
    <Row>
      {products.map((item) => (
        <Col lg={3} md={6} className="t-footerProduct_item" key={item.code}>
          <ProductCard {...item} />
        </Col>
      ))}
    </Row>
  </div>
);

export default FooterProduct;
