import { Story, Meta } from '@storybook/react';
import React from 'react';

import Menu from '.';

export default {
  title: 'Components/organisms/Menu',
  component: Menu,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{
    display: 'flex',
    width: '100%',
    height: '100vh',
    background: '#ccc'
  }}
  >
    <Menu />
  </div>
);
