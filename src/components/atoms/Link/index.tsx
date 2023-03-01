import React from 'react';
import {
  Link as NavLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

export interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  href?: string;
  customClassName?: string;
  useExternal?: boolean;
  activeClassName?: string;
  handleClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
  href,
  useExternal,
  customClassName = '',
  activeClassName = '',
  children,
  handleClick,
  ...props
}) => {
  if (useExternal) {
    return (
      <a
        {...props}
        className={`a-link ${customClassName} ${activeClassName}`}
        href={href}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <NavLink
      {...props}
      to={href || '#'}
      className={`a-link ${customClassName} ${activeClassName}`}
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
};

export default Link;
