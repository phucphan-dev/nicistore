import React from 'react';

import Typography from 'components/atoms/Typography';
import mapModifiers, { renderPrice, roundingPrice } from 'utils/functions';

interface PriceSaleProps {
  promo?: number;
  price: number;
  unit: string;
  isHorizontal?: boolean;
  bigger?: boolean;
}

const PriceSale: React.FC<PriceSaleProps> = ({
  promo, price, unit, isHorizontal, bigger
}) => (
  <div className={mapModifiers('m-priceSale', isHorizontal && 'horizontal')}>
    <div className="m-priceSale_original">
      <Typography.Text modifiers={promo ? [bigger ? '16x18' : '12x14', 'black3', '500', 'lineThrough'] : [bigger ? '18x21' : '14x16', '700']}>
        {renderPrice(price, true, unit)}
      </Typography.Text>
    </div>
    {!!promo && promo > 0 && (
      <div className="m-priceSale_sale">
        <Typography.Text modifiers={[bigger ? '18x21' : '14x16', '700']}>
          {renderPrice(roundingPrice(price * (100 - promo) / 100), true, unit)}
        </Typography.Text>
      </div>
    )}
  </div>
);

PriceSale.defaultProps = {
  promo: undefined,
};

export default PriceSale;
