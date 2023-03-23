import { Story, Meta } from '@storybook/react';
import React from 'react';

import Header from '.';

export default {
  title: 'Components/organisms/Header',
  component: Header,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ height: '100vh', background: '#ccc' }}><Header menus={[]} /></div>
);
