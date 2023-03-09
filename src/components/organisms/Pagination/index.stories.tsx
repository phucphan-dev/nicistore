import { Story, Meta } from '@storybook/react';
import React from 'react';

import Pagination from '.';

export default {
  title: 'Components/organisms/Pagination',
  component: Pagination,
  argTypes: {
    totalPage: {
      control: {
        type: 'number',
      },
      defaultValue: 5,
    },
    pageRange: {
      control: {
        type: 'number',
      },
      defaultValue: 2,
    },
    onChange: { action: 'changed' },
  },
} as Meta;

export const normal: Story = ({
  totalPage, pageRange, onChange,
}) => (
  <div
    style={{
      padding: '100px 0',
    }}
  >
    <Pagination
      totalPage={totalPage}
      handleChangePage={onChange}
      pageRangeDisplayed={pageRange}
    />
  </div>
);
