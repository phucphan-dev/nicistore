import { Story, Meta } from '@storybook/react';
import React from 'react';

import Section from '.';

export default {
  title: 'Components/organisms/Section',
  component: Section,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Section />
);
