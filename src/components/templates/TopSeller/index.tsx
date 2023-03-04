import React from 'react';

import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import ProductCard, { ProductCardProps } from 'components/organisms/ProductCard';

interface TopSellerProps {
  first: ProductCardProps;
  second: ProductCardProps;
  collection: CollectionData;
}

const TopSeller: React.FC<TopSellerProps> = ({ first, second, collection }) => (
  <Container>
    <div className="t-topSeller">
      <div className="t-topSeller_product">
        <ProductCard {...first} />
      </div>
      <div className="t-topSeller_collection">
        <Image imgSrc={collection.thumbnail} alt={collection.subtitle} />
        <div className="t-topSeller_content">
          <div className="t-topSeller_subtitle">
            <Typography.Heading type="h4" modifiers={['uppercase', '12x14', 'white', 'center']}>{collection.subtitle}</Typography.Heading>
          </div>
          <div className="t-topSeller_title">
            <Typography.Heading type="h2" modifiers={['48x54', '300', 'white', 'center']}>{collection.title}</Typography.Heading>
          </div>
          <div className="t-topSeller_description">
            <Typography.Text modifiers={['16x18', 'white', 'center']}>{collection.description}</Typography.Text>
          </div>
          <Link href={collection.href}>
            <div className="t-topSeller_link">
              <Typography.Text modifiers={['16x18', 'white']}>Shop Now</Typography.Text>
              <div className="t-topSeller_icon">
                <Icon iconName="arrowRightWhite" size="24" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="t-topSeller_product">
        <ProductCard {...second} />
      </div>
    </div>
  </Container>
);

export default TopSeller;