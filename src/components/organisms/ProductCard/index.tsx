import React, { useState } from 'react';

import Badge from 'components/atoms/Badge';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Typography from 'components/atoms/Typography';
import mapModifiers from 'utils/functions';

export interface ProductCardProps {
  code: string;
  images: string[];
  promo?: number;
  name: string;
  price: number;
  unit: string;
  starCount: number;
  reviewCount?: number;
  available?: number;
  solded?: number;
  handleViewDetail?: (code: string) => void;
  handleLove?: (code: string) => void;
  handleQuickView?: (code: string) => void;
  handleAddToCart?: (code: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  code, images, promo, name, price, unit, starCount, reviewCount,
  available, solded, handleAddToCart, handleViewDetail, handleLove, handleQuickView
}) => {
  const [imgActive, setImgActive] = useState(0);
  return (
    <div className="o-productCard">
      <div className="o-productCard_thumbnail">
        <div className="o-productCard_badge"><Badge isOnSale content={`${promo}%`} /></div>
        <div className="o-productCard_actions">
          <div className="o-productCard_actions_item">
            <Button
              iconName="love"
              iconSize="16"
              sizes="h34"
              variant="circle"
              handleClick={() => handleLove && handleLove(code)}
            />
          </div>
          <div className="o-productCard_actions_item">
            <Button
              iconName="expand"
              iconSize="16"
              sizes="h34"
              variant="circle"
              handleClick={() => handleQuickView && handleQuickView(code)}
            />
          </div>
          <div className="o-productCard_actions_item">
            <Button
              iconName="cart"
              iconSize="16"
              sizes="h34"
              variant="circle"
              handleClick={() => handleAddToCart && handleAddToCart(code)}
            />
          </div>
        </div>
        <div className="o-productCard_images" onClick={() => handleViewDetail && handleViewDetail(code)}>
          {images.length > 1 && (
            <>
              <div className="o-productCard_slider">
                {images.map((item, idx) => (
                  <div key={item} className="o-productCard_slider-pane" onMouseEnter={() => setImgActive(idx)} />
                ))}
              </div>
              <div className="o-productCard_indicator">
                {images.map((item, idx) => (
                  <div key={`${item}indicator`} className={mapModifiers('o-productCard_indicator-dot', idx === imgActive && 'active')} />
                ))}
              </div>
            </>
          )}
          <Image imgSrc={images[imgActive]} alt={`product-${code}-${imgActive}`} />
        </div>
      </div>
      <div className="o-productCard_content">
        <div className="o-productCard_content_title" onClick={() => handleViewDetail && handleViewDetail(code)}>
          <Typography.Heading type="h3" modifiers={['15x18']}>{name}</Typography.Heading>
        </div>
        <div className="o-productCard_price">
          <div className="o-productCard_price_original">
            <Typography.Text modifiers={['14x16', 'ashGrey', 'lineThrough']}>
              {unit}
              {price.toFixed(2)}
            </Typography.Text>
          </div>
          {promo && (
            <div className="o-productCard_price_sale">
              <Typography.Text modifiers={['16x18', '700']}>
                {unit}
                {(price * (100 - promo) / 100).toFixed(2)}
              </Typography.Text>
            </div>
          )}
        </div>
        <div className="o-productCard_content_switcher">
          <div className="o-productCard_content_star">
            {Array(starCount).fill(0).map((_, index) => (
              <Icon
                key={`${code}-promo-${index.toString()}`}
                iconName="star"
                size="12"
              />
            ))}
          </div>
          {reviewCount && (
            <span className="o-productCard_content_review">
              {reviewCount}
              {' '}
              review
            </span>
          )}
        </div>
        {available && solded && (
          <>
            <div className="o-productCard_inventory_progress">
              <div
                className="o-productCard_inventory_status"
                style={{ width: `${available / (available + solded) * 100}%` }}
              />
            </div>
            <div className="o-productCard_inventory">
              <div className="o-productCard_inventory_available">
                <Typography.Text type="span" modifiers={['12x14', 'ashGrey']}>Available: </Typography.Text>
                <Typography.Text type="span" modifiers={['12x14', '700']}>{available}</Typography.Text>
              </div>
              <div className="o-productCard_inventory_solded">
                <Typography.Text type="span" modifiers={['12x14', 'ashGrey']}>Sold: </Typography.Text>
                <Typography.Text type="span" modifiers={['12x14', '700', 'carminePink']}>{solded}</Typography.Text>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  promo: undefined,
  handleViewDetail: undefined,
  handleLove: undefined,
  handleQuickView: undefined,
  handleAddToCart: undefined,
  reviewCount: undefined,
  available: undefined,
  solded: undefined
};

export default ProductCard;
