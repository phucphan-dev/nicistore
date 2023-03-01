import { Story, Meta } from '@storybook/react';
import React from 'react';

import Loading from '.';

export default {
  title: 'Components/atoms/Loading',
  component: Loading,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['fullScreen', 'default'],
      },
      defaultValue: 'default',
    },
    isWhite: {
      control: {
        type: 'boolean',
      },
      defaultValue: 'false',
    },
  },
} as Meta;

export const normal: Story = ({ variant, isWhite }) => (
  <Loading isShow variant={variant} isWhite={isWhite} />
);
