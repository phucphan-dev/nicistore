import { Story, Meta } from '@storybook/react';
import React from 'react';

import Icon, { iconList, IconName } from '.';

export default {
  title: 'Components/atoms/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['40', '24', '16'],
      },
      defaultValue: '40',
    },
  },
} as Meta;

const listIcon = Object.keys(iconList).map((item) => item as IconName);

export const normal: Story = ({ size }) => (
  <div style={{
    padding: 10,
    display: 'flex',
  }}
  >
    {listIcon.map((item, index) => (
      <div key={`${index.toString()}`} style={{ marginLeft: 5 }}>
        <Icon iconName={item} size={size} />
      </div>
    ))}
  </div>
);
