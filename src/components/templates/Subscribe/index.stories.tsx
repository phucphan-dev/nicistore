import { Story, Meta } from '@storybook/react';
import React from 'react';

import Subscribe from '.';

export default {
  title: 'Components/templates/Subscribe',
  component: Subscribe,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Subscribe />
);
