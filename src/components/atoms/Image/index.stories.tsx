import { Story, Meta } from '@storybook/react';
import React from 'react';

import Image from '.';

import logo from 'assets/images/logo.svg';

export default {
  title: 'Components/atoms/Image',
  component: Image,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Image imgSrc={logo} alt="logo" />
);
