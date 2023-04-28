import React from 'react';

import mapModifiers from 'utils/functions';

export const iconList = {
  cart: 'cart',
  expand: 'expand',
  love: 'love',
  loveFill: 'loveFill',
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
  filter: 'filter',
  share: 'share',
  closeWhite: 'closeWhite',
  facebook: 'facebook',
  instagram: 'instagram',
  tiktok: 'tiktok',
  phone: 'phone',
  gmail: 'gmail',
  edit: 'edit',
  delete: 'delete',
  location: 'location',
  scrollDown: 'scrollDown',
  home: 'home',
  menu: 'menu',
  shop: 'shop',
};

export type IconName = keyof typeof iconList;

export type IconSize = '6' | '8' | '12' | '16' | '20' | '24' | '32' | '40';
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
