import { Story, Meta } from '@storybook/react';
import React from 'react';

import SizeSelect from '.';

export default {
  title: 'Components/atoms/SizeSelect',
  component: SizeSelect,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ padding: '20px', display: 'flex', gap: '16px' }}>
    <SizeSelect sizeName="S" type="radio" name="test" />
    <SizeSelect sizeName="M" type="radio" name="test" />
    <SizeSelect sizeName="L" type="radio" name="test" />
    <SizeSelect sizeName="XL" type="radio" name="test" />
  </div>
);
