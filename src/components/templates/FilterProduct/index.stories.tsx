import { Story, Meta } from '@storybook/react';
import React from 'react';

import FilterProduct from '.';

import categoriesDummy, { colorsDummy, sizeDummy } from 'assets/dummy/filters';

export default {
  title: 'Components/templates/FilterProduct',
  component: FilterProduct,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ width: '30%', padding: '50px' }}>
    <FilterProduct categories={categoriesDummy} colors={colorsDummy} sizes={sizeDummy} />
  </div>
);
