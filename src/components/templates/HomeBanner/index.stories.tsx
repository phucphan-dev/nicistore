import { Story, Meta } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import HomeBanner from '.';

export default {
  title: 'Components/templates/HomeBanner',
  component: HomeBanner,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <BrowserRouter>
    <HomeBanner />
  </BrowserRouter>
);
