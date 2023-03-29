import React from 'react';

import mapModifiers from 'utils/functions';

type FontWeightStyle =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type TextStyle =
  | 'uppercase'
  | 'capitalize'
  | 'underline'
  | 'italic'
  | 'center'
  | 'justify'
  | 'normal'
  | 'right'
  | 'left'
  | 'lineThrough'
  | 'nowrap';

type ColorStyle =
  | 'white'
  | 'black'
  | 'ashGrey'
  | 'carminePink'
  | 'sonicSilver'
  | 'ferrariRed'
  | 'black3'
  | 'cadetGrey'
  | 'mayGreen';

type LetterSpacing = 'ls-md' | 'ls-lg' | 'ls-xl';

type GeneralTextStyle =
  | FontWeightStyle
  | TextStyle
  | ColorStyle
  | LetterSpacing;

type Sizes = '10x12' | '12x14' | '12x17' | '13x16' | '13x19' | '14x16' | '15x18' | '16x18' | '18x21' | '20x24' | '22x25' | '24x28' | '28x32' | '30x36' | '32x36' | '36x40' | '38x42' | '40x48' | '48x54' | '76x80';

type TextStyleAll = (GeneralTextStyle | Sizes | ColorStyle)[];

interface TextProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
  modifiers?: TextStyleAll;
  type?: 'p' | 'span' | 'div';
  children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ modifiers, type = 'p', children }) => {
  const Element = type;
  return (
    <Element className={mapModifiers('a-text', modifiers)}>
      {children}
    </Element>
  );
};

Text.defaultProps = {
  modifiers: undefined,
  children: undefined,
};

/* Heading */

interface HeadingProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  modifiers?: TextStyleAll;
  children?: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  type = 'h2',
  modifiers,
  children,
}) => {
  const Element = type;

  return (
    <Element className={mapModifiers('a-heading', modifiers)}>
      {children}
    </Element>
  );
};

const Typography = { Text, Heading };

export default Typography;
