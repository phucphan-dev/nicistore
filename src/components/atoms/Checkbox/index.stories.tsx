/* eslint-disable no-console */
import { Meta, Story } from '@storybook/react';
import React, { ChangeEvent } from 'react';

import Checkbox from '.';

export default {
  title: 'Components/atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    id: { control: 'text', defaultValue: 'checkbox_1' },
    value: { control: 'text', defaultValue: 'checkbox_1' },
    name: { control: 'text', defaultValue: 'checkbox_1' },
    error: { control: 'text', defaultValue: '' },
    colors: {
      control: {
        type: 'select',
        options: ['outerSpace'],
      },
      defaultValue: 'outerSpace',
    },
  },
} as Meta;
export const normal: Story = ({
  id, value, name, error,
}) => (
  <Checkbox
    id={id}
    value={value}
    name={name}
    error={error}
    onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.checked)}
  />
);

export const withLabel: Story = ({
  id, value, name, error,
}) => (
  <Checkbox
    id={id}
    value={value}
    name={name}
    error={error}
    onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.checked)}
  >
    Bằng cách nhấn vào đây, Tôi – Phạm Đức Huy đã đọc,
    hiểu và đồng ý với điều khoản và điều kiện mở tài khoản tại VCBS.
  </Checkbox>
);
