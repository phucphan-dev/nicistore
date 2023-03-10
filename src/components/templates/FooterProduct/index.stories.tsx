import { Story, Meta } from '@storybook/react';
import React from 'react';

import FooterProduct from '.';

import { featuredProducts } from 'assets/dummy/homepage';

export default {
  title: 'Components/templates/FooterProduct',
  component: FooterProduct,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <FooterProduct title="test" products={featuredProducts.slice(0, 4)} />
);
