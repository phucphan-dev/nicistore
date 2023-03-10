import { Story, Meta } from '@storybook/react';
import React from 'react';

import PriceSale from '.';

export default {
  title: 'Components/molecules/PriceSale',
  component: PriceSale,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <PriceSale promo={12} price={300} unit="$" />
);
