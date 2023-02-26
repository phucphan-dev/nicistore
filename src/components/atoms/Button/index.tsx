/* eslint-disable react/button-has-type */
import React from 'react';

import Loading from '../Loading';

import Icon, { IconName, IconSize } from 'components/atoms/Icon';
import mapModifiers from 'utils/functions';

type Variant = 'primary' | 'secondary' | 'dark' | 'info';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  iconName?: IconName;
  iconSize?: IconSize;
  children?: React.ReactNode;
  sizes?: 'h24' | 'h34' | 'h36' | 'h42' | 'h44' | 'h48' | 'h56';
  loading?: boolean;
  handleClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  sizes,
  iconName,
  iconSize = '16',
  type = 'button',
  loading,
  handleClick,
  ...props
}) => (
  <button {...props} type={type} className={mapModifiers('a-button', variant, sizes, !children && 'only-icon')} onClick={handleClick}>
    {loading ? (
      <Loading isShow />
    )
      : (
        <>
          {
            iconName && (
              <div className="a-button_icon">
                <Icon iconName={iconName} size={iconSize} />
              </div>
            )
          }
          {children}
        </>
      )}
  </button>
);

Button.defaultProps = {
};

export default Button;
