import { Story, Meta } from '@storybook/react';
import React from 'react';

import Radio from '.';

export default {
  title: 'Components/atoms/Radio',
  component: Radio,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Radio
    text="Không biết"
  />
);
