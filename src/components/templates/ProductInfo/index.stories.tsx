import { Story, Meta } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ProductInfo from '.';

import productDummy from 'assets/dummy/product';

export default {
  title: 'Components/templates/ProductInfo',
  component: ProductInfo,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <BrowserRouter>
    <div style={{ padding: '30px' }}>
      <ProductInfo {...productDummy} />
    </div>
  </BrowserRouter>
);
