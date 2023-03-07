import { Story, Meta } from '@storybook/react';
import React from 'react';

import SizeSelect from '.';

export default {
  title: 'Components/atoms/SizeSelect',
  component: SizeSelect,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ height: '100vh', margin: '10px' }}>
    <SizeSelect
      listSize={['XS', 'M', 'L']}
      nameListSize="sizeGroup"
    />
  </div>
);
