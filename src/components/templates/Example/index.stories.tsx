import { Story, Meta } from '@storybook/react';
import React from 'react';

import Example from '.';

export default {
  title: 'Components/templates/Example',
  component: Example,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Example />
);
