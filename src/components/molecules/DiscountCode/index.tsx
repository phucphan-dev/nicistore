import React from 'react';

import Typography from 'components/atoms/Typography';

interface DiscountCodeProps {
  children?: React.ReactNode;
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ children }) => (
  <div className="m-discountCode">
    <Typography.Text modifiers={['14x16', 'ferrariRed', '500']}>{children}</Typography.Text>
  </div>
);

DiscountCode.defaultProps = {
  children: undefined,
};

export default DiscountCode;
