import { Story, Meta } from '@storybook/react';
import React from 'react';

import Select from '.';

export default {
  title: 'Components/atoms/Select',
  component: Select,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['nobackground', undefined],
      },
      defaultValue: undefined,
    },
    isWhite: {
      control: {
        type: 'boolean',
      },
      defaultValue: 'false',
    },
  },
} as Meta;

export const normal: Story = ({ variant }) => (
  <div style={{ padding: '50px', backgroundColor: '#cccccc', height: '100vh' }}>
    <Select
      name="test"
      placeholder="Select.."
      modifier={variant}
      value={{ id: '1', value: '1', label: '1' }}
      options={[{ id: '1', value: '1', label: '1' }, { id: '2', value: '2', label: '2' }, { id: '3', value: '3', label: '3' }]}
      isSearch
    />
  </div>
);
