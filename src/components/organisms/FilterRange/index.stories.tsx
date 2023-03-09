import { Story, Meta } from '@storybook/react';
import React from 'react';

import InputRange from '.';

export default {
  title: 'Components/organisms/InputRange',
  component: InputRange,
  argTypes: {},
} as Meta;

export const Multi: Story = () => (
  <div style={{ padding: 20, background: '#ccc' }}>
    <InputRange
      label="Price"
      unit="VND"
      minValue={0}
      maxValue={100000}
      // eslint-disable-next-line no-console
      handleFilter={(val) => console.log(val)}
      defaultValue={{
        min: 30000,
        max: 60000,
      }}
    />
  </div>
);
