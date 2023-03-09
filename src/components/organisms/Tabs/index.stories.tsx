import { Story, Meta } from '@storybook/react';
import React, { useState } from 'react';

import { Tab, TabPanel, Tabs } from '.';

export default {
  title: 'Components/organisms/Tabs',
  component: Tabs,
  argTypes: {},
} as Meta;

const dummyData = [
  {
    label: 'Content 1',
    content: 'Content 1',
  },
  {
    label: 'Content 2',
    content: 'Content 2',
  },
  {
    label: 'Content 3',
    content: 'Content 3',
  },
];

export const Normal: Story = () => {
  const [indexActive, setIndexActive] = useState(0);

  return (
    <div>
      <Tabs variableMutate={indexActive}>
        {
            dummyData.map((item, index) => (
              <Tab
                key={`tab-${index.toString()}`}
                label={item.label}
                active={index === indexActive}
                handleClick={() => setIndexActive(index)}
              />
            ))
          }
      </Tabs>
      {
          dummyData.map((item, index) => (
            <TabPanel key={`tab-panel-${index.toString()}`} active={index === indexActive}>
              {item.content}
            </TabPanel>
          ))
        }
    </div>
  );
};
