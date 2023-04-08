import { Story, Meta } from '@storybook/react';
import React from 'react';

import TopSeller from '.';

import nc000001 from 'assets/images/NC000001.jpg';

export default {
  title: 'Components/templates/TopSeller',
  component: TopSeller,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <TopSeller
    first={{
      id: 1,
      code: 'C00001_00001',
      images: [nc000001],
      promo: 12,
      name: 'Check Overshirt With Pocket Detail',
      price: 112,
      unit: '$',
      starCount: 3,
      reviewCount: 5,
      available: 79,
      solded: 21,
    }}
    second={{
      id: 1,
      code: 'C00001_00001',
      images: [nc000001],
      promo: 12,
      name: 'Check Overshirt With Pocket Detail',
      price: 112,
      unit: '$',
      starCount: 3,
      reviewCount: 5,
      available: 79,
      solded: 21,
    }}
    collection={
      {
        subtitle: 'WINTER 2022 COLLECTION',
        title: 'Making someone feel pretty is an art',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        thumbnail: 'https://klbtheme.com/clotya/wp-content/uploads/2022/05/banner-10.jpg'
      }
    }
  />
);
