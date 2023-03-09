import { Story, Meta } from '@storybook/react';
import React from 'react';

import FilterCategory from '.';

import categoriesDummy from 'assets/dummy/filters';

export default {
  title: 'Components/organisms/FilterCategory',
  component: FilterCategory,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ width: '40%' }}>
    <FilterCategory categories={categoriesDummy} />
  </div>
);
