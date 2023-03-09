import { Story, Meta } from '@storybook/react';
import React from 'react';

import ImagePreview from '.';

import nc000001 from 'assets/images/NC000001.jpg';

export default {
  title: 'Components/organisms/ImagePreview',
  component: ImagePreview,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ width: '50%' }}>
    <ImagePreview imgSrc={nc000001} alt="" />
  </div>
);
