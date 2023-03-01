import { Story, Meta } from '@storybook/react';
import React from 'react';

import Typography from '.';

export default {
  title: 'Components/atoms/Typography',
  argTypes: {
    sizes: {
      control: {
        type: 'select',
        options: [
          '10x12', '12x14', '13x16', '14x16', '15x18', '16x18', '18x21', '20x24', '22x25', '24x28', '28x32', '30x36', '32x36', '36x40', '40x48'
        ],
      },
      defaultValue: '16x18',
    },
    text: {
      control: {
        type: 'text',
      },
      defaultValue: 'Thông tin chung',
    },
    colors: {
      control: {
        type: 'select',
        options: [
          'white',
          'black',
        ],
      },
      defaultValue: 'black',
    },
    fontweight: {
      control: {
        type: 'select',
        options: [
          '100',
          '200',
          '300',
          '400',
          '500',
          '600',
          '700',
          '800',
          '900',
        ],
      },
      defaultValue: '400',
    },
    variants: {
      control: {
        type: 'radio',
        options: [
          'uppercase',
          'capitalize',
          'underline',
          'italic',
          'center',
          'justify',
          'normal',
          'right',
          'left',
          'nowrap',
        ],
        defaultValue: 'normal'
      },
    },
    type: {
      control: {
        type: 'radio',
        options: ['p', 'span', 'div'],
      },
      defaultValue: 'p',
    },
    heading: {
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
        ],
      },
      defaultValue: 'h2',
    },
  },
} as Meta;

export const Text: Story = ({
  sizes, type, variants, fontweight, colors, text
}) => (
  <Typography.Text
    type={type}
    modifiers={[sizes, variants, fontweight, colors]}
  >
    {text}
  </Typography.Text>
);

export const Heading: Story = ({
  sizes, variants, fontweight, colors, text, heading
}) => (
  <Typography.Heading
    type={heading}
    modifiers={[sizes, variants, fontweight, colors]}
  >
    {text}
  </Typography.Heading>
);
