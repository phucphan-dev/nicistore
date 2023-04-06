import { Story, Meta } from '@storybook/react';
import React from 'react';

import BuyForMe from '.';

export default {
  title: 'Components/templates/BuyForMe',
  component: BuyForMe,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <BuyForMe />
);
