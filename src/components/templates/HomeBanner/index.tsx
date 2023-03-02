import React from 'react';

import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import Carousel, { NextArrow, PrevArrow } from 'components/organisms/Carousel';

interface HomeBannerProps {
  banners: CollectionData[];
}

const HomeBanner: React.FC<HomeBannerProps> = ({ banners }) => {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots o-carousel_dots-banner',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // autoplay: true,
    prevArrow: <PrevArrow extendClassname="slick-arrow-banner" />,
    nextArrow: <NextArrow extendClassname="slick-arrow-banner" />,
    cssEase: 'ease-in-out',
    infinite: true,
  };
  return (
    <div className="t-homeBanner">
      <Carousel settings={settings}>
        {banners.map((banner, index) => (
          <div className="t-homeBanner_item" key={`t-homeBanner-${index.toString()}`}>
            <Image imgSrc={banner.thumbnail} alt={banner.subtitle} />
            <div className="t-homeBanner_content">
              <div className="t-homeBanner_subtitle">
                <Typography.Heading type="h4" modifiers={['uppercase', '12x14']}>{banner.subtitle}</Typography.Heading>
              </div>
              <div className="t-homeBanner_title">
                <Typography.Heading type="h2" modifiers={['76x80', '300']}>{banner.title}</Typography.Heading>
              </div>
              <div className="t-homeBanner_description">
                <Typography.Text modifiers={['16x18']}>{banner.description}</Typography.Text>
              </div>
              <Link href={banner.href}>
                <div className="t-homeBanner_link">
                  <Typography.Text modifiers={['16x18']}>Shop Now</Typography.Text>
                  <div className="t-homeBanner_icon">
                    <Icon iconName="arrowRight" size="24" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

HomeBanner.defaultProps = {
};

export default HomeBanner;
