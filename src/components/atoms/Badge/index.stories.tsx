import { Story, Meta } from '@storybook/react';
import React from 'react';

import Badge from '.';

export default {
  title: 'Components/atoms/Badge',
  component: Badge,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ background: '#ccc', padding: '24px' }}>
    <Badge content="25%" isOnSale />
  </div>
);
