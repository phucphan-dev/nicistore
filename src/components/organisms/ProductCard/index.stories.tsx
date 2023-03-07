import { Story, Meta } from '@storybook/react';
import React from 'react';

import ProductCard, { ProductRecentViews } from '.';

import nc000001 from 'assets/images/NC000001.jpg';

export default {
  title: 'Components/organisms/ProductCard',
  component: ProductCard,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ width: '20%', padding: '25px' }}>
    <ProductCard
      code="C00001_00001"
      images={[nc000001]}
      promo={12}
      name="Check Overshirt With Pocket Detail"
      price={112}
      unit="$"
      starCount={3}
      reviewCount={5}
      available={79}
      solded={21}
    />
  </div>
);

export const productRecentViews: Story = () => (
  <div style={{ padding: '25px' }}>
    <ProductRecentViews
      code="C00001_00001"
      images={[nc000001]}
      promo={12}
      name="Check Overshirt With Pocket Detail"
      price={112}
      unit="$"
    />
  </div>
);
