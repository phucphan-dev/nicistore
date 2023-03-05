import { Story, Meta } from '@storybook/react';
import React from 'react';

import Input from '.';

export default {
  title: 'Components/atoms/Input',
  component: Input,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Input />
);
