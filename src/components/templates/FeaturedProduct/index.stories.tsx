import { Story, Meta } from '@storybook/react';
import React from 'react';

import FeaturedProduct from '.';

export default {
  title: 'Components/templates/FeaturedProduct',
  component: FeaturedProduct,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <FeaturedProduct products={[]} />
);
