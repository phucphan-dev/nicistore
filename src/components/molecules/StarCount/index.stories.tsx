import { Story, Meta } from '@storybook/react';
import React from 'react';

import StarCount from '.';

export default {
  title: 'Components/molecules/StarCount',
  component: StarCount,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <StarCount count={3} />
);
