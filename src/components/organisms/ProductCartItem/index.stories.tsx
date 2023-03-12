import { Story, Meta } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ProductCartItem from '.';

import nc000001 from 'assets/images/NC000001.jpg';

export default {
  title: 'Components/organisms/ProductCartItem',
  component: ProductCartItem,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <BrowserRouter>
    <div style={{ padding: '50px' }}>
      <ProductCartItem
        image={nc000001}
        href="#"
        name="Check Overshirt With Pocket Detail"
        color="Black"
        size="M"
      />
    </div>
  </BrowserRouter>
);
