/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef } from 'react';

import banner from 'assets/images/banner.jpg';
import Button from 'components/atoms/Button';
import ColorSelect from 'components/atoms/ColorSelect';
import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import SizeSelect from 'components/atoms/SizeSelect';
import Typography from 'components/atoms/Typography';
import PriceSale from 'components/molecules/PriceSale';
import Animate from 'components/organisms/Animate';
import Carousel, { NextArrow, PrevArrow } from 'components/organisms/Carousel';
import Container from 'components/organisms/Container';
import useIsMobile from 'hooks/useDeviceQueries';
import useWindowDimensions from 'hooks/useWindowDemensions';

interface HomeBannerProps {
  banners: CollectionData[];
}

const HomeBanner: React.FC<HomeBannerProps> = ({ banners }) => {
  const { height } = useWindowDimensions();
  const { isMobile } = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const scrollDown = useCallback(() => {
    if (isMobile) {
      window.scrollTo({
        top: window.innerWidth * 3 / 2 - 84,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: window.innerHeight - 84,
        behavior: 'smooth',
      });
    }
  }, [isMobile]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.classList.add('animated');
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="t-homeBanner" ref={ref} style={{ maxHeight: `${height - 84}px` }}>
      <div className="t-homeBanner_background"><Image imgSrc={banner} alt="banner" ratio="16x9" /></div>
      <div className="t-homeBanner_content">
        <Container>
          <div className="t-homeBanner_title">
            <Animate type="fadeInLeft" noScroll extendClassName="animate-s2">
              <Typography.Heading type="h2" modifiers={['76x80', '500']}>Đầm lông vũ</Typography.Heading>
            </Animate>
            <Animate type="fadeInUp" noScroll extendClassName="animate-s2">
              <div className="t-homeBanner_product_price">
                <PriceSale bigger isHorizontal unit="VNĐ" price={591000} promo={10} />
              </div>
            </Animate>
            <Animate type="fadeInUp" noScroll extendClassName="animate-s23">
              <div className="t-homeBanner_product_colors">
                <ColorSelect
                  name="color"
                  type="radio"
                  color="#ffffff"
                />
                <ColorSelect
                  name="color"
                  type="radio"
                  color="#000"
                />
                <ColorSelect
                  name="color"
                  type="radio"
                  color="#d62f2f"
                />
              </div>
            </Animate>
            <Animate type="fadeInUp" noScroll extendClassName="animate-s23">
              <div className="t-homeBanner_product_sizes">
                <SizeSelect
                  name="size"
                  type="radio"
                  sizeName="S"
                />
                <SizeSelect
                  name="size"
                  type="radio"
                  sizeName="M"
                />
                <SizeSelect
                  name="size"
                  type="radio"
                  sizeName="L"
                />
              </div>
            </Animate>
            <Animate type="fadeInUp" noScroll extendClassName="animate-s3">
              <div className="t-homeBanner_link">
                <Button
                  variant="dark"
                  sizes="h48"
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </Animate>
          </div>
        </Container>
      </div>
      <div className="t-homeBanner_scrolldown" onClick={scrollDown}>
        <Animate type="fadeInUp" noScroll extendClassName="animate-s3">
          <div className="t-homeBanner_scrolldown_wrapper">
            <Icon iconName="scrollDown" size="32" />
          </div>
        </Animate>
      </div>
    </div>
  );
};

HomeBanner.defaultProps = {
};

export default HomeBanner;
