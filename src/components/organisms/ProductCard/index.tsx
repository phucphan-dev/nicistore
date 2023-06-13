/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Badge from 'components/atoms/Badge';
import Button from 'components/atoms/Button';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import PriceSale from 'components/molecules/PriceSale';
import StarCount from 'components/molecules/StarCount';
import { favoriteProductService } from 'services/product';
import { useAppSelector } from 'store/hooks';
import { ROUTES_PATH } from 'utils/constants';
import mapModifiers from 'utils/functions';

export interface ProductInfoData {
  id: number;
  slug?: string;
  code: string;
  images: string[];
  promo?: number;
  name: string;
  price: number;
  unit: string;
  starCount?: number;
  reviewCount?: number;
  available?: number;
  solded?: number;
  isFavorited: boolean;
}
export interface ProductCardProps extends ProductInfoData {
  handleLove?: (code: string) => void;
  handleQuickView?: (code: string) => void;
  handleAddToCart?: (code: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id, slug, code, images, promo, name, price, unit, isFavorited, starCount, reviewCount,
  available, solded
}) => {
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.auth.profile);
  const [imgActive, setImgActive] = useState(0);
  const [favorite, setFavorite] = useState(isFavorited);
  const { mutate: favoriteMutate } = useMutation(
    'favoriteAction',
    favoriteProductService,
  );
  return (
    <div className="o-productCard">
      <div className="o-productCard_thumbnail">
        <div className="o-productCard_badge">
          <Badge content={available && available > 0 ? 'Có sẵn' : 'Hàng order'} />
          {!!promo && promo > 0 && <Badge isOnSale content={`${promo}%`} />}
        </div>
        <Link href={slug ? `${ROUTES_PATH.PRODUCT_DETAIL}/${slug}` : '#'} aria-label={name}>
          <div className="o-productCard_images">
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
            <Image imgSrc={images[imgActive]} alt={`product-${code}-${imgActive}`} ratio="1x1" />
          </div>
        </Link>
        <div className="o-productCard_actions">
          <div className="o-productCard_actions_item">
            <Button
              iconName={favorite ? 'loveFill' : 'love'}
              iconSize="16"
              sizes="h34"
              variant="circle"
              id="love-action"
              aria-label="Love Action"
              handleClick={() => {
                if (profile) {
                  setFavorite(!favorite);
                  favoriteMutate(id);
                } else {
                  toast.error('Đăng nhập để sử dụng tính năng này');
                }
              }}
            />
          </div>
          {/* <div className="o-productCard_actions_item">
            <Button
              iconName="expand"
              iconSize="16"
              sizes="h34"
              variant="circle"
              handleClick={() => handleQuickView && handleQuickView(code)}
            />
          </div> */}
          {/* <div className="o-productCard_actions_item">
            <Button
              iconName="cart"
              iconSize="16"
              sizes="h34"
              variant="circle"
              handleClick={() => navigate(`${ROUTES_PATH.PRODUCT_DETAIL}/${slug}`)}
            />
          </div> */}
        </div>
      </div>
      <div className="o-productCard_content">
        <Link href={slug ? `${ROUTES_PATH.PRODUCT_DETAIL}/${slug}` : '#'} aria-label={name}>
          <div className="o-productCard_content_title">
            <Typography.Heading type="h3" modifiers={['15x18']}>{name}</Typography.Heading>
          </div>
        </Link>
        <div className="o-productCard_price">
          <PriceSale unit={unit} promo={promo} price={price} />
        </div>
        {/* <div className="o-productCard_content_switcher">
          {starCount && <StarCount count={starCount} />}
          {reviewCount && (
            <Typography.Text modifiers={['12x14']}>
              {reviewCount}
              {' '}
              review
            </Typography.Text>
          )}
        </div> */}
        {/* {!!available && !!solded && (
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
        )} */}
      </div>
    </div>
  );
};

export const ProductRecentViews: React.FC<ProductCardProps> = ({
  images, promo, name, price, unit,
}) => (
  <div className="o-productRecentViews">
    <div className="o-productRecentViews_image">
      <Image imgSrc={images[0]} alt="Product Recent View" ratio="1x1" />
    </div>
    <div className="o-productRecentViews_content">
      <Typography.Heading type="h4" modifiers={['14x16', '400']}>{name}</Typography.Heading>
      <div className="o-productRecentViews_price">
        <div className="o-productRecentViews_price_original">
          <Typography.Text modifiers={promo ? ['12x14', 'black3', 'lineThrough'] : ['13x16', '500', 'black']}>
            {unit}
            {price.toFixed(2)}
          </Typography.Text>
        </div>
        {promo && (
          <div className="o-productRecentViews_price_sale">
            <Typography.Text modifiers={['13x19', '500', 'black']}>
              {unit}
              {(price * (100 - promo) / 100).toFixed(2)}
            </Typography.Text>
          </div>
        )}
      </div>
    </div>
  </div>
);

ProductCard.defaultProps = {
  promo: undefined,
  handleLove: undefined,
  handleQuickView: undefined,
  handleAddToCart: undefined,
  reviewCount: undefined,
  available: undefined,
  solded: undefined
};

export default ProductCard;
