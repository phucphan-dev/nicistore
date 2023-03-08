import { Story, Meta } from '@storybook/react';
import React from 'react';

import ColorSelect from '.';

export default {
  title: 'Components/atoms/ColorSelect',
  component: ColorSelect,
  argTypes: {},
} as Meta;

export const Radio: Story = () => (
  <div style={{ padding: '20px', display: 'flex', gap: '16px' }}>
    <ColorSelect
      type="radio"
      color="#016243"
      name="colorProduct"
    />
    <ColorSelect
      type="radio"
      color="#000000"
      name="colorProduct"
    />
  </div>
);

export const Checkbox: Story = () => (
  <div style={{ height: '100vh', margin: '20px' }}>
    <ColorSelect
      type="checkbox"
      color="#016243"
      name="colorProduct"
      label="Green"
    />
    <ColorSelect
      type="checkbox"
      color="#000000"
      name="colorProduct"
      label="Black"
    />
  </div>
);
