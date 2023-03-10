import { Story, Meta } from '@storybook/react';
import React, { useState } from 'react';

import CustomModal from '.';

export default {
  title: 'Components/organisms/Modal',
  component: CustomModal,
  argTypes: {},
} as Meta;

export const Normal: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Open Modal</button>
      <CustomModal showIconClose isOpen={isOpen} handleClose={() => setIsOpen(false)} variant="notification">
        <div style={{ backgroundColor: 'white', height: '600px' }}>
          <h3 className="font-weight-bold text-center">
            <b>
              Vẫn còn câu hỏi chưa được trả lời
            </b>
          </h3>
        </div>
      </CustomModal>
    </>
  );
};
