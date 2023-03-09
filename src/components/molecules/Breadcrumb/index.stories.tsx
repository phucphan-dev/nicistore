import { Story, Meta } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Breadcrumb, { BreadcrumbTypes } from '.';

export default {
  title: 'Components/molecules/Breadcrumb',
  component: Breadcrumb,
  argTypes: {},
} as Meta;

const breadcrumb: BreadcrumbTypes[] = [
  {
    slug: '/',
    text: 'Trang chủ',
  },
  {
    slug: '/tuyen-sinh',
    text: 'Tuyển sinh',
  },
  {
    slug: '/ho-tro-sinh-vien',
    text: 'Hỗ trợ sinh viên',
  },
];

export const normal: Story = () => (
  <div style={{ padding: 30 }}>
    <BrowserRouter>
      <Breadcrumb breadcrumbs={breadcrumb} />
    </BrowserRouter>
  </div>
);
