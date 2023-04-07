import React from 'react';

import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import Animate from 'components/organisms/Animate';
import Container from 'components/organisms/Container';
import ProductCard, { ProductCardProps } from 'components/organisms/ProductCard';

interface TopSellerProps {
  first: ProductCardProps;
  second: ProductCardProps;
  collection: CollectionData;
}

const TopSeller: React.FC<TopSellerProps> = ({ first, second, collection }) => (
  <Container>
    <Typography.Heading type="h3" modifiers={['center', '30x36', '500']}>Sản phẩm bán chạy</Typography.Heading>
    {/* <div className="t-topSeller_description">
      <Typography.Text modifiers={['center', 'sonicSilver', '16x18']}>
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Quis ipsum suspendisse
        ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
      </Typography.Text>
    </div> */}
    <div className="t-topSeller">
      <div className="t-topSeller_product">
        <Animate type="zoomInLeft">
          <ProductCard {...first} />
        </Animate>
      </div>
      <div className="t-topSeller_collection">
        <Animate type="zoomIn">
          <Image imgSrc={collection.thumbnail} alt={collection.subtitle} ratio="605x480" />
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
        </Animate>
      </div>
      <div className="t-topSeller_product">
        <Animate type="zoomInRight">
          <ProductCard {...second} />
        </Animate>
      </div>
    </div>
  </Container>
);

export default TopSeller;
