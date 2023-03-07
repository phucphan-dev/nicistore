import { Story, Meta } from '@storybook/react';
import React from 'react';

import ColorSelect from '.';

export default {
  title: 'Components/atoms/ColorSelect',
  component: ColorSelect,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ height: '100vh', margin: '20px' }}>
    <ColorSelect
      listColor={['black', 'cadmiumGreen']}
      nameListColor="colorSelectGroup"
    />
  </div>
);
