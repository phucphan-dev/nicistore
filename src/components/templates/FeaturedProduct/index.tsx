import React from 'react';

import Typography from 'components/atoms/Typography';
import Animate from 'components/organisms/Animate';
import Carousel, { NextArrow, PrevArrow } from 'components/organisms/Carousel';
import Container from 'components/organisms/Container';
import ProductCard, { ProductCardProps } from 'components/organisms/ProductCard';

interface FeaturedProductProps {
  products: ProductCardProps[];
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ products }) => {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots o-carousel_dots-bottom',
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    // autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    infinite: true,
    cssEase: 'linear',
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="t-featuredProduct">
      <Container>
        <Animate type="fadeInDown">
          <Typography.Heading type="h3" modifiers={['center', '30x36', '500']}>Sản phẩm nổi bật</Typography.Heading>
        </Animate>
        {/* <div className="t-featuredProduct_description">
          <Typography.Text modifiers={['center', 'sonicSilver', '16x18']}>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse
            ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </Typography.Text>
        </div> */}
        <div className="t-featuredProduct_products">
          <Carousel settings={settings}>
            {products.map((product, index) => (
              <div className="t-featuredProduct_item" key={`t-featuredProduct-${index.toString()}`}>
                <Animate type="wobble">
                  <ProductCard {...product} />
                </Animate>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProduct;
