/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { forwardRef, useId } from 'react';

import Typography from '../Typography';

import mapModifiers from 'utils/functions';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  modifiers?: '12x18' | '16x28';
  disableLabel?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    name, error, children, modifiers, disableLabel, required, ...props
  }, ref) => {
    const id = useId();
    return (
      <label htmlFor={id} className={mapModifiers('a-checkbox', required && 'required')}>
        <input
          className="a-checkbox_input"
          type="checkbox"
          id={id}
          ref={ref}
          name={name}
          hidden
          {...props}
        />
        <span className="a-checkbox_holder" />
        {children && (
          <span className="a-checkbox_label">
            <Typography.Text modifiers={['14x16']}>{children}</Typography.Text>
          </span>
        )}
      </label>
    );
  },
);

Checkbox.defaultProps = {
  error: undefined,
};

export default Checkbox;
