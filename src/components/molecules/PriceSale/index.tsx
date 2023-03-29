import React from 'react';

import Typography from 'components/atoms/Typography';
import { renderPrice, roundingPrice } from 'utils/functions';

interface PriceSaleProps {
  promo?: number;
  price: number;
  unit: string;
}

const PriceSale: React.FC<PriceSaleProps> = ({ promo, price, unit }) => (
  <div className="m-priceSale">
    <div className="m-priceSale_original">
      <Typography.Text modifiers={promo ? ['12x14', 'ashGrey', 'lineThrough'] : ['14x16', '700']}>
        {renderPrice(price, true, unit)}
      </Typography.Text>
    </div>
    {!!promo && promo > 0 && (
      <div className="m-priceSale_sale">
        <Typography.Text modifiers={['14x16', '700']}>
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
