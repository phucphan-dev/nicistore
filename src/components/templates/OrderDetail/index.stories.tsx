import { Story, Meta } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import OrderDetail from '.';

import orderDummy from 'assets/dummy/order';

export default {
  title: 'Components/templates/OrderDetail',
  component: OrderDetail,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <BrowserRouter>
    <OrderDetail {...orderDummy} code="23734384390743423" />
  </BrowserRouter>
);
