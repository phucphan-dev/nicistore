import React from 'react';

import Typography from 'components/atoms/Typography';

interface DiscountCodeProps {
  children?: React.ReactNode;
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ children }) => (
  <span className="m-discountCode">
    <Typography.Text type="span" modifiers={['14x16', 'ferrariRed', '500']}>{children}</Typography.Text>
  </span>
);

DiscountCode.defaultProps = {
  children: undefined,
};

export default DiscountCode;
