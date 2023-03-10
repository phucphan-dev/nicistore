import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { featuredProducts } from 'assets/dummy/homepage';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import Select from 'components/atoms/Select';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Pagination from 'components/organisms/Pagination';
import ProductCard from 'components/organisms/ProductCard';
import FilterProduct from 'components/templates/FilterProduct';
import FooterProduct from 'components/templates/FooterProduct';
import mapModifiers from 'utils/functions';

const Products: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-products">
      <Container>
        <Row>
          <Col lg={3}>
            <div className={mapModifiers('p-products_sidebar', open && 'open')}>
              <div className="p-products_sidebar_title">
                <Typography.Heading type="h3" modifiers={['14x16', '500']}>Filter Product</Typography.Heading>
                <div className="p-products_sidebar_close">
                  <Button iconName="close" variant="whiteBorder" iconSize="16" handleClick={() => setOpen(false)} />
                </div>
              </div>
              <FilterProduct />
            </div>
          </Col>
          <Col lg={9}>
            <div className="p-products_content">
              <div className="p-products_banner">
                <Image
                  imgSrc="https://k4j3j2s7.rocketcdn.me/clotya/wp-content/uploads/2022/05/banner-26.jpg"
                  alt="Product Banner"
                  ratio="921x329"
                />
                <div className="p-products_banner_content">
                  <Typography.Heading type="h2" modifiers={['38x42', '400']}>
                    Plus-Size Styles for Every Season
                  </Typography.Heading>
                  <div className="p-products_banner_text">
                    <Typography.Text modifiers={['16x18']}>
                      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
                    </Typography.Text>
                  </div>
                </div>
              </div>
              <div className="p-products_controls">
                <div className="p-products_controls-left">
                  <Button iconName="filter" iconSize="24" handleClick={() => setOpen(true)}>
                    <Typography.Text>Filter</Typography.Text>
                  </Button>
                </div>
                <div className="p-products_controls-right">
                  <Typography.Text>Show: </Typography.Text>
                  <Select
                    name="test"
                    placeholder="Select.."
                    modifier="nobackground"
                    value={{ id: '1', value: '16', label: '16 Items' }}
                    options={[{ id: '1', value: '16', label: '16 Items' }, { id: '1', value: '20', label: '20 Items' }, { id: '1', value: '24', label: '24 Items' }]}
                  />
                </div>
              </div>
              <div className="p-products_list">
                {[...featuredProducts, ...featuredProducts].map((item, index) => (
                  <div className="p-products_item" key={item.code + index.toString()}>
                    <ProductCard {...item} />
                  </div>
                ))}
              </div>
              <div className="p-products_pagination">
                <Pagination totalPage={5} />
              </div>
            </div>
          </Col>
        </Row>
        <div className="p-products_related">
          <FooterProduct title="Recently View products" products={featuredProducts.slice(0, 4)} />
        </div>
      </Container>
    </div>
  );
};

export default Products;
