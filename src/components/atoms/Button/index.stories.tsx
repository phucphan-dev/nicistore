import { Story, Meta } from '@storybook/react';
import React from 'react';

// import { iconList } from '../Icon';

import Button from '.';

export default {
  title: 'Components/atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'dark', 'secondary', 'info'],
      },
      defaultValue: 'primary'
    },
    sizes: {
      control: {
        type: 'select',
        options: ['h24', 'h34', 'h36', 'h42', 'h44', 'h48', 'h56'],
      },
      defaultValue: 'h48'
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    iconName: {
      control: {
        type: 'select',
        options: ['search', 'null'],
      },
      defaultValue: 'null',
    },
  },
} as Meta;

export const normal: Story = ({
  variant, sizes, disabled, loading, iconName
}) => (
  <div style={{ padding: '20px', maxWidth: 272 }}>
    <Button
      variant={variant}
      sizes={sizes}
      disabled={disabled}
      loading={loading}
      iconName={iconName !== 'null' ? iconName : undefined}
      iconSize="16"
    >
      Add Selected to Cart
    </Button>
  </div>
);

export const IconButton: Story = ({
  variant, sizes, disabled, loading, iconName
}) => (
  <div style={{ padding: '20px', maxWidth: 272 }}>
    <Button
      variant={variant}
      sizes={sizes}
      disabled={disabled}
      loading={loading}
      iconName={iconName !== 'null' ? iconName : undefined}
      iconSize="16"
    />
  </div>
);
