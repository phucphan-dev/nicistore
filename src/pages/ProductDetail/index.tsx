import React from 'react';

import breadcrumb from 'assets/dummy/breadcrumb';
import { featuredProducts } from 'assets/dummy/homepage';
import productDummy, { productTabsDummy } from 'assets/dummy/product';
import Breadcrumb from 'components/molecules/Breadcrumb';
import Container from 'components/organisms/Container';
import Tabs from 'components/organisms/Tabs';
import FooterProduct from 'components/templates/FooterProduct';
import ProductInfo from 'components/templates/ProductInfo';

const ProductDetail: React.FC = () => (
  <div className="p-productDetail">
    <Container>
      <Breadcrumb breadcrumbs={breadcrumb} />
      <div className="p-productDetail_content">
        <ProductInfo {...productDummy} />
      </div>
      <div className="p-productDetail_tabs">
        <Tabs tabs={['Description', 'Additional information', 'Reviews (2)']} modifiers={['underline']}>
          {
            productTabsDummy.map((item, index) => (
              <div key={`content-${index.toString()}`}>{item}</div>
            ))
          }
        </Tabs>
      </div>
      <div className="p-productDetail_related">
        <FooterProduct title="Related products" products={featuredProducts.slice(0, 4)} />
      </div>
    </Container>
  </div>
);

export default ProductDetail;
