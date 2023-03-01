import { Story, Meta } from '@storybook/react';
import React from 'react';

import ProductCard from '.';

export default {
  title: 'Components/organisms/ProductCard',
  component: ProductCard,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ width: '30%' }}>
    <ProductCard
      code="C00001_00001"
      images={['https://klbtheme.com/clotya/wp-content/uploads/2022/04/overshirt3-500x750.jpg']}
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
