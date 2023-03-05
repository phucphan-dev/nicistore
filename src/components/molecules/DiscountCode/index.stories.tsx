import { Story, Meta } from '@storybook/react';
import React from 'react';

import DiscountCode from '.';

export default {
  title: 'Components/molecules/DiscountCode',
  component: DiscountCode,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <DiscountCode>FREE15FIRST</DiscountCode>
);
