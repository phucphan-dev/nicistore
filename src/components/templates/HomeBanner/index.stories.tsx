import { Story, Meta } from '@storybook/react';
import React from 'react';

import HomeBanner from '.';

export default {
  title: 'Components/templates/HomeBanner',
  component: HomeBanner,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <HomeBanner banners={[
    {
      thumbnail: 'https://klbtheme.com/clotya/wp-content/uploads/2022/05/slider-06.jpg'
    }
  ]}
  />
);
