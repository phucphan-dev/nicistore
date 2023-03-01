import { Story, Meta } from '@storybook/react';
import React from 'react';

import Container from '.';

export default {
  title: 'Components/organisms/Container',
  component: Container,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Container />
);
