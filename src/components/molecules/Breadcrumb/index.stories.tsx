import { Story, Meta } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Breadcrumb from '.';

import breadcrumb from 'assets/dummy/breadcrumb';

export default {
  title: 'Components/molecules/Breadcrumb',
  component: Breadcrumb,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ padding: 30 }}>
    <BrowserRouter>
      <Breadcrumb breadcrumbs={breadcrumb} />
    </BrowserRouter>
  </div>
);
