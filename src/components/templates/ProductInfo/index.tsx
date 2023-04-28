/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useEffect, useMemo, useRef, useState
} from 'react';
import { Col, Row } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import ReactSlick from 'react-slick';
import { toast } from 'react-toastify';
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
import { addToCartService, checkStockService } from 'services/cart';
import { favoriteProductService } from 'services/product';
import { addToCart } from 'store/cart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LOCALSTORAGE } from 'utils/constants';
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
  id,
  slug,
  code,
  images,
  name,
  shortDescription,
  promo,
  price,
  unit,
  starCount,
  reviewCount,
  colorSize,
  sku,
  categories,
  tags,
}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const { width: wWidth, height: wHeight } = useWindowDimensions();
  const carouselRef = useRef<ReactSlick>(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [color, setColor] = useState<Color>();
  const [size, setSize] = useState<ProductProperty>();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | undefined>(undefined);

  const colorWithSize: ColorWithSize | undefined = useMemo(() => (colorSize && colorSize.length > 0
    ? colorSize.reduce((prev: any, curr) => ({
      ...prev,
      [curr.color.id.toString()]: prev[curr.color.id] ? {
        ...prev[curr.color.id],
        size: [...prev[curr.color.id].size, curr.size]
      }
        : {
          color: {
            id: curr.color.id,
            label: curr.color.name,
            color: curr.color.code
          },
          size: [curr.size],
          quantity: curr.quantity,
          image: curr.image
        }
    }), {}) : undefined), [colorSize]);

  const sizeMemo: ProductProperty[] = useMemo(
    () => (
      color && colorWithSize ? colorWithSize[color.id.toString()].size : []),
    [color, colorWithSize]
  );

  const imageGaleries = useMemo(() => (colorWithSize
    ? ([...images, ...Object.values(colorWithSize).filter((item) => !!item.image).map(
      (item, idx) => ({ id: images.length + idx, path: item.image })
    )]) : images), [colorWithSize, images]);

  const { mutate: addToCartMutate, isLoading } = useMutation(
    'addToCartAction',
    addToCartService,
  );

  const { mutate: checkStockMutate, isLoading: checkStockLoading } = useMutation(
    'checkStockAction',
    checkStockService,
    {
      onSuccess: () => {
        const cartLocal = localStorage.getItem(LOCALSTORAGE.NICI_CART);
        const cartData = cartLocal ? JSON.parse(cartLocal) as CartItem[] : [];
        if (!color) {
          toast.error('Vui lòng chọn màu sắc', { toastId: 'selectColor' });
        } else if (!size) {
          toast.error('Vui lòng chọn kích thước', { toastId: 'selectColor' });
        } else if (quantity < 1) {
          toast.error('Số lượng phải lớn hơn 0', { toastId: 'selectColor' });
        } else {
          dispatch(addToCart({
            id: cartData.length > 0 ? Number(cartData[cartData.length - 1].id) + 1 : 1,
            productId: id,
            image: imageGaleries[active].path,
            link: slug,
            name,
            color: { id: color.id, name: color.label, code: color.color },
            size,
            quantity,
            price
          }));
          toast.success('Thêm vào giỏ thành công!', { toastId: 'addToCartSuccess' });
          if (profile) {
            addToCartMutate([{
              productId: id, sizeId: size.id, colorId: color.id, quantity
            }]);
          }
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-shadow
      onError(error: any) {
        setError(`Số lượng tồn kho không đủ. Hiện chỉ còn ${error.response.data.errors[0].stock}`);
        queryClient.invalidateQueries(['getProductDetail']);
      },
    }
  );

  const { mutate: favoriteMutate } = useMutation(
    'favoriteAction',
    favoriteProductService,
  );

  const handleAddToCart = useCallback((isOrder?: boolean) => {
    if (!color) {
      toast.error('Vui lòng chọn màu sắc', { toastId: 'selectColor' });
    } else if (!size) {
      toast.error('Vui lòng chọn kích thước', { toastId: 'selectColor' });
    } else if (quantity < 1) {
      toast.error('Số lượng phải lớn hơn 0', { toastId: 'selectColor' });
    } else if (isOrder) {
      const cartLocal = localStorage.getItem(LOCALSTORAGE.NICI_CART);
      const cartData = cartLocal ? JSON.parse(cartLocal) as CartItem[] : [];
      if (!color) {
        toast.error('Vui lòng chọn màu sắc', { toastId: 'selectColor' });
      } else if (!size) {
        toast.error('Vui lòng chọn kích thước', { toastId: 'selectColor' });
      } else if (quantity < 1) {
        toast.error('Số lượng phải lớn hơn 0', { toastId: 'selectColor' });
      } else {
        dispatch(addToCart({
          id: cartData.length > 0 ? Number(cartData[cartData.length - 1].id) + 1 : 1,
          productId: id,
          image: imageGaleries[active].path,
          link: slug,
          name,
          color: { id: color.id, name: color.label, code: color.color },
          size,
          quantity,
          price,
          isOrder
        }));
        toast.success('Thêm vào giỏ thành công!', { toastId: 'addToCartSuccess' });
        if (profile) {
          addToCartMutate([{
            productId: id, sizeId: size.id, colorId: color.id, quantity, isOrder
          }]);
        }
      }
    } else {
      checkStockMutate({
        productId: id, sizeId: size.id, colorId: color.id, quantity
      });
    }
  }, [active, addToCartMutate, checkStockMutate, color,
    dispatch, id, imageGaleries, name, price, profile, quantity, size, slug]);

  useEffect(() => {
    if (color && colorWithSize) {
      setSize(colorWithSize[color.id.toString()].size[0]);
    }
  }, [color, colorWithSize]);

  useEffect(() => {
    if (colorWithSize) {
      setColor(colorWithSize[Object.keys(colorWithSize)[0]].color);
    }
  }, [colorWithSize]);

  useEffect(() => {
    carouselRef.current?.slickGoTo(active);
  }, [active]);

  return (
    <div className="t-productInfo">
      <Row>
        <Col lg={5}>
          <div className="t-productInfo_carousel">
            <Carousel ref={carouselRef} settings={settings}>
              {imageGaleries.map((item, idx) => <ImagePreview key={`${code}-image-${idx.toString()}`} imgSrc={item.path} alt={`${code}-image-${idx}`} />)}
            </Carousel>
            <div className="t-productInfo_expanded" onClick={() => setZoom(true)}>
              <Icon iconName="expand" size="20" />
            </div>
          </div>
          <div className="t-productInfo_dots">
            {imageGaleries.map((item, idx) => (
              <div className={mapModifiers('t-productInfo_dot', active === idx && 'active')} onClick={() => setActive(idx)}>
                <Image imgSrc={item.path} alt={`${code}-image-${idx}`} ratio="1x1" />
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
                Đánh giá
              </Typography.Text>
            )}
          </div>
          <div className="t-productInfo_price">
            <PriceSale isHorizontal unit={unit} price={price} promo={promo} />
          </div>
          <div className="t-productInfo_description" dangerouslySetInnerHTML={{ __html: shortDescription }} />
          {colorWithSize && (
            <>
              <div className="t-productInfo_colors">
                <Typography.Text modifiers={['14x16', '400']}>
                  Màu sắc:
                  {' '}
                  <strong>{color?.label}</strong>
                </Typography.Text>
                <div className="t-productInfo_colors_list">
                  {Object.keys(colorWithSize).map((key, idx) => {
                    const item = colorWithSize[key];
                    return (
                      <div className="t-productInfo_color" key={`${item.color.id}-${item.color.color}`}>
                        <ColorSelect
                          name={`${code}color`}
                          checked={color?.id === item.color.id}
                          type="radio"
                          color={item.color.color}
                          onChange={() => {
                            setColor(item.color);
                            if (idx + images.length < imageGaleries.length) {
                              setActive(idx + images.length);
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="t-productInfo_sizes">
                <Typography.Text modifiers={['14x16', '400']}>
                  Kích thước:
                  {' '}
                  {size?.name}
                </Typography.Text>
                <div className="t-productInfo_sizes_list">
                  {sizeMemo.map((item) => (
                    <div className="t-productInfo_size" key={item.code}>
                      <SizeSelect
                        name={`${code}size`}
                        type="radio"
                        checked={size?.id === item.id}
                        sizeName={item.name}
                        onChange={() => setSize(item)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {color && (
                <div className="t-productInfo_stock">
                  <Typography.Text modifiers={['14x16', '400']}>
                    Kho:
                    {' '}
                    <strong>{colorWithSize[color.id.toString()].quantity > 0 ? colorWithSize[color.id.toString()].quantity : 'Hết hàng'}</strong>
                  </Typography.Text>
                </div>
              )}
            </>
          )}
          <div className="t-productInfo_quantity">
            <QuantityInput
              initQuantity={quantity}
              handleChange={(value) => {
                setQuantity(value);
                if (error) {
                  setError(undefined);
                }
              }}
            />
            <div className="t-productInfo_addTo">
              <Button
                variant="dark"
                sizes="h48"
                handleClick={() => handleAddToCart(colorWithSize && color
                  && colorWithSize[color.id.toString()].quantity === 0)}
                loading={isLoading || checkStockLoading}
              >
                {colorWithSize && color && colorWithSize[color.id.toString()].quantity > 0 ? 'Thêm vào giỏ hàng' : 'Đặt hàng'}
              </Button>
            </div>
          </div>
          {
            error && (
              <div className="t-productInfo_error">
                {error}
              </div>
            )
          }
          <div className="t-productInfo_controls">
            <Button
              iconName="love"
              iconSize="16"
              handleClick={() => {
                if (profile) {
                  favoriteMutate(id);
                } else {
                  toast.error('Đăng nhập để sử dụng tính năng này');
                }
              }}
            >
              Yêu thích
            </Button>
            {/* <Button iconName="share" iconSize="16">Chia sẻ</Button> */}
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
                <Typography.Text type="span" modifiers={['ashGrey']}>Danh mục: </Typography.Text>
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
                <Typography.Text type="span" modifiers={['ashGrey']}>Thẻ: </Typography.Text>
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
            <img src={imageGaleries[active].path} alt={code} />
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
