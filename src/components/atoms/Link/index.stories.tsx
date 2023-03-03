import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Link from '.';

export default {
  title: 'Components/atoms/Link',
  component: Link,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <Router>
    <Link href="/home">Home</Link>
    &nbsp;
    <Link href="/about">About</Link>
  </Router>

);

export const useExternal: Story = () => (
  <Router>
    <Link useExternal target="_blank" href="https://google.com.vn">
      useExternal Link
    </Link>
  </Router>
);
