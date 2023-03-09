import { Story, Meta } from '@storybook/react';
import React from 'react';

import Tabs from '.';

export default {
  title: 'Components/organisms/Tabs',
  component: Tabs,
  argTypes: {
    modifiers: {
      control: {
        type: 'select',
        options: ['underline', 'center', 'none'],
      },
      defaultValue: 'none'
    }
  },
} as Meta;

const dummyData = [
  {
    label: 'Label 1',
    content: 'Content 1',
  },
  {
    label: 'Label 2',
    content: 'Content 2',
  },
  {
    label: 'Label 3',
    content: 'Content 3',
  },
];

export const Normal: Story = ({ modifiers }) => (
  <div>
    <Tabs tabs={dummyData.map((item) => item.label)} modifiers={modifiers}>
      {
        dummyData.map((item, index) => (
          <div key={`content-${index.toString()}`}>{item.content}</div>
        ))
      }
    </Tabs>
  </div>
);
