import { Story, Meta } from '@storybook/react';
import React from 'react';

import HomeCategory from '.';

export default {
  title: 'Components/templates/HomeCategory',
  component: HomeCategory,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <HomeCategory categories={[]} />
);
