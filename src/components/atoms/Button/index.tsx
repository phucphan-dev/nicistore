/* eslint-disable react/button-has-type */
import React from 'react';

import Loading from '../Loading';

import Icon, { IconName, IconSize } from 'components/atoms/Icon';
import mapModifiers from 'utils/functions';

type Variant = 'primary' | 'secondary' | 'dark' | 'info' | 'circle' | 'whiteBorder';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  iconName?: IconName;
  iconSize?: IconSize;
  children?: React.ReactNode;
  circle?: boolean;
  sizes?: 'h24' | 'h34' | 'h36' | 'h42' | 'h44' | 'h48' | 'h56';
  loading?: boolean;
  badge?: number;
  iconRight?: boolean;
  handleClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  sizes,
  iconName,
  badge,
  iconSize = '16',
  type = 'button',
  loading,
  iconRight,
  handleClick,
  ...props
}) => (
  <button {...props} type={type} className={mapModifiers('a-button', variant, sizes, !children && 'only-icon', iconRight && 'iconRight')} onClick={handleClick}>
    {loading ? (
      <Loading isShow />
    )
      : (
        <>
          {
            iconName && (
              <div className="a-button_icon">
                <Icon iconName={iconName} size={iconSize} />
                {!!badge && badge > 0 && <span className="a-button_badge">{badge}</span>}
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
