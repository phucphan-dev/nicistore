/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactSlick from 'react-slick';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import Button from 'components/atoms/Button';
import ColorSelect from 'components/atoms/ColorSelect';
import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import SizeSelect from 'components/atoms/SizeSelect';
import Typography from 'components/atoms/Typography';
import PriceSale from 'components/molecules/PriceSale';
import QuantityInput from 'components/molecules/QuantityInput';
import StarCount from 'components/molecules/StarCount';
import Carousel, { NextArrow, PrevArrow } from 'components/organisms/Carousel';
import ImagePreview from 'components/organisms/ImagePreview';
import useWindowDimensions from 'hooks/useWindowDemensions';
import mapModifiers from 'utils/functions';

const settings = {
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow extendClassname="slick-arrow-banner" />,
  nextArrow: <NextArrow extendClassname="slick-arrow-banner" />,
  cssEase: 'ease-in-out',
  infinite: true,
};

const ProductInfo: React.FC<ProductInfo> = ({
  code,
  images,
  name,
  description,
  promo,
  price,
  unit,
  starCount,
  reviewCount,
  colors,
  sizes,
  sku,
  categories,
  tags,
}) => {
  const { width: wWidth, height: wHeight } = useWindowDimensions();
  const carouselRef = useRef<ReactSlick>(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [color, setColor] = useState(colors ? colors[0].label : '');
  const [size, setSize] = useState(sizes ? sizes[0].label : '');
  useEffect(() => {
    carouselRef.current?.slickGoTo(active);
  }, [active]);
  return (
    <div className="t-productInfo">
      <Row>
        <Col lg={5}>
          <div className="t-productInfo_carousel">
            <Carousel ref={carouselRef} settings={settings}>
              {images.map((item, idx) => <ImagePreview key={`${code}-image-${idx.toString()}`} imgSrc={item} alt={`${code}-image-${idx}`} />)}
            </Carousel>
            <div className="t-productInfo_expanded" onClick={() => setZoom(true)}>
              <Icon iconName="expand" size="20" />
            </div>
          </div>
          <div className="t-productInfo_dots">
            {images.map((item, idx) => (
              <div className={mapModifiers('t-productInfo_dot', active === idx && 'active')} onClick={() => setActive(idx)}>
                <Image imgSrc={item} alt={`${code}-image-${idx}`} ratio="1x1" />
              </div>
            ))}
          </div>
        </Col>
        <Col lg={7}>
          <Typography.Heading>{name}</Typography.Heading>
          <div className="t-productInfo_review">
            {starCount && <StarCount count={starCount} />}
            {reviewCount && (
              <Typography.Text modifiers={['16x18']}>
                {reviewCount}
                {' '}
                reviews
              </Typography.Text>
            )}
          </div>
          <div className="t-productInfo_price">
            <PriceSale unit={unit} price={price} promo={promo} />
          </div>
          <div className="t-productInfo_description">
            <Typography.Text modifiers={['14x16']}>{description}</Typography.Text>
          </div>
          {colors && (
            <div className="t-productInfo_colors">
              <Typography.Text modifiers={['14x16', '400']}>
                Color:
                {' '}
                {color}
              </Typography.Text>
              <div className="t-productInfo_colors_list">
                {colors.map((item) => (
                  <div className="t-productInfo_color" key={item.code}>
                    <ColorSelect
                      name={`${code}color`}
                      checked={color === item.label}
                      type="radio"
                      color={item.color}
                      onChange={() => setColor(item.label)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {sizes && (
            <div className="t-productInfo_sizes">
              <Typography.Text modifiers={['14x16', '400']}>
                Size:
                {' '}
                {size}
              </Typography.Text>
              <div className="t-productInfo_sizes_list">
                {sizes.map((item) => (
                  <div className="t-productInfo_size" key={item.code}>
                    <SizeSelect
                      name={`${code}size`}
                      type="radio"
                      checked={size === item.label}
                      sizeName={item.label}
                      onChange={() => setSize(item.label)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="t-productInfo_quantity">
            <QuantityInput initQuantity={1} />
            <div className="t-productInfo_addTo">
              <Button variant="dark" sizes="h48">Add to cart</Button>
            </div>
          </div>
          <div className="t-productInfo_controls">
            <Button iconName="love" iconSize="16">Add to Wishlist</Button>
            <Button iconName="share" iconSize="16">Share this Product</Button>
          </div>
          <div className="t-productInfo_tags">
            {sku && (
              <div className="t-productInfo_tags_line">
                <Typography.Text type="span" modifiers={['ashGrey']}>SKU: </Typography.Text>
                <Typography.Text type="span">{sku}</Typography.Text>
              </div>
            )}
            {categories && (
              <div className="t-productInfo_tags_line">
                <Typography.Text type="span" modifiers={['ashGrey']}>Categories: </Typography.Text>
                {categories.map((item, idx) => (
                  <Link key={item}>
                    <Typography.Text type="span" modifiers={['14x16', '700']}>
                      {idx === categories.length - 1 ? item : `${item}, `}
                    </Typography.Text>
                  </Link>
                ))}
              </div>
            )}
            {tags && (
              <div className="t-productInfo_tags_line">
                <Typography.Text type="span" modifiers={['ashGrey']}>Tags: </Typography.Text>
                {tags.map((item, idx) => (
                  <Typography.Text key={item} type="span">
                    {idx === tags.length - 1 ? item : `${item}, `}
                  </Typography.Text>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
      <div className={mapModifiers('t-productInfo_previewer', zoom && 'active')} style={{ width: `${wWidth}px`, height: `${wHeight}px` }}>
        <TransformWrapper>
          <TransformComponent>
            <img src={images[active]} alt={code} />
          </TransformComponent>
        </TransformWrapper>
        <div className="t-productInfo_close" onClick={() => setZoom(false)}>
          <Icon iconName="close" size="20" />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
