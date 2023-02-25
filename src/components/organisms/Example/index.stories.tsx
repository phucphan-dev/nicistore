import { Story, Meta } from '@storybook/react';
import React from 'react';

import Example from '.';

export default {
  title: 'Components/organisms/Example',
  component: Example,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Example />
);
