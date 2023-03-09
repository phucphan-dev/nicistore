/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { forwardRef } from 'react';

import Typography from '../Typography';

import mapModifiers from 'utils/functions';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  error?: string;
  modifiers?: '12x18' | '16x28';
  disableLabel?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    id, name, error, children, modifiers, disableLabel, ...props
  }, ref) => (
    <div className="a-checkbox">
      <div className="a-checkbox_main">
        <input
          className="a-checkbox_main_input"
          type="checkbox"
          id={id}
          ref={ref}
          name={name}
          {...props}
        />
        <label
          className={mapModifiers('a-checkbox_main_label', modifiers)}
          htmlFor={disableLabel ? 'disableLabel' : id}
        >
          {children || ''}
        </label>
      </div>
      {error && <Typography.Text>{error}</Typography.Text>}
    </div>
  ),
);

Checkbox.defaultProps = {
  error: undefined,
};

export default Checkbox;
