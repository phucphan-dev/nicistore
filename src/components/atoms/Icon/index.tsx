import React from 'react';

import mapModifiers from 'utils/functions';

export const iconList = {
  cart: 'cart',
  expand: 'expand',
  love: 'love',
  search: 'search',
  star: 'star',
  user: 'user',
  close: 'close',
  hambuger: 'hambuger',
  arrowRight: 'arrowRight',
  arrowRightWhite: 'arrowRightWhite',
  plus: 'plus',
  minus: 'minus',
  arrowBlackNext: 'arrowBlackNext',
  arrowBlackPrev: 'arrowBlackPrev',
};

export type IconName = keyof typeof iconList;

export type IconSize = '12' | '16' | '20' | '24' | '32' | '40';
interface IconProps {
  iconName: IconName;
  size?: IconSize;
}
const Icon: React.FC<IconProps> = ({ iconName, size }) => (
  <i className={mapModifiers('a-icon', iconName, size)} />);

Icon.defaultProps = {
  size: '40',
};

export default Icon;
