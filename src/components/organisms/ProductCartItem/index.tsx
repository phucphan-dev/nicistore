import React from 'react';

import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';

interface ProductCartItemProps {
  image: string;
  name: string;
  href: string;
  color?: string;
  size?: string;
  isOrder?: boolean;
  handleDelete?: () => void;
}

const ProductCartItem: React.FC<ProductCartItemProps> = ({
  image, name, href, color, size, isOrder, handleDelete
}) => (
  <div className="o-productCartItem">
    <div className="o-productCartItem_image">
      <Image imgSrc={image} alt={name} ratio="1x1" />
    </div>
    <div className="o-productCartItem_content">
      <Link href={href}><Typography.Heading type="h4" modifiers={['16x18']}>{name}</Typography.Heading></Link>
      <div className="o-productCartItem_color">
        {color && (
          <Typography.Text modifiers={['14x16']} type="span">
            Color:
            {' '}
            <Typography.Text modifiers={['600']} type="span">{color}</Typography.Text>
          </Typography.Text>
        )}
        {size && (
          <Typography.Text modifiers={['14x16']} type="span">
            , Size:
            {' '}
            <Typography.Text modifiers={['600']} type="span">{size}</Typography.Text>
          </Typography.Text>
        )}
      </div>
      {isOrder && (
        <div className="o-productCartItem_isOrder">
          <Typography.Text modifiers={['14x16', '600', 'ferrariRed']}>
            Đặt trước
            <br />
            <Typography.Text type="span" modifiers={['400', 'italic', 'ferrariRed']}>Với sản phẩm đặt trước, khách vui lòng cọc 50% giá trị giúp shop nhé &#10084;</Typography.Text>
          </Typography.Text>
        </div>
      )}
    </div>
    <div className="o-productCartItem_remove" onClick={handleDelete}>
      <Icon iconName="closeWhite" size="8" />
    </div>
  </div>
);

ProductCartItem.defaultProps = {
  color: undefined,
  size: undefined
};

export default ProductCartItem;
