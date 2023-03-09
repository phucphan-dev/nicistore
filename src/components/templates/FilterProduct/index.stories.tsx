import { Story, Meta } from '@storybook/react';
import React from 'react';

import FilterProduct from '.';

export default {
  title: 'Components/templates/FilterProduct',
  component: FilterProduct,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ width: '30%', padding: '50px' }}>
    <FilterProduct />
  </div>
);
