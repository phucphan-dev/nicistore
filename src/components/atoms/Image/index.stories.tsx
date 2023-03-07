import { Story, Meta } from '@storybook/react';
import React from 'react';

import Image from '.';

export default {
  title: 'Components/atoms/Image',
  component: Image,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ maxWidth: '600px', padding: '50px', background: '#ccc' }}><Image imgSrc="https://klbtheme.com/clotya/wp-content/uploads/2022/05/slider-04.jpg" alt="logo" ratio="1531x541" /></div>
);
