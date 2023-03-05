import { Story, Meta } from '@storybook/react';
import React from 'react';

import WidgetSection from '.';

export default {
  title: 'Components/organisms/WidgetSection',
  component: WidgetSection,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <WidgetSection>
    Super discount for your first purchase.
  </WidgetSection>
);
