import { Story, Meta } from '@storybook/react';
import React from 'react';

import TextArea from '.';

export default {
  title: 'Components/atoms/TextArea',
  component: TextArea,
  argTypes: {
    rows: {
      control: {
        type: 'number',
      },
      defaultValue: 3,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    error: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
  },
} as Meta;

export const normal: Story = ({
  rows, error, disabled,
}) => (
  <TextArea
    placeholder="Placeholder"
    rows={rows}
    error={error}
    disabled={disabled}
  />
);
