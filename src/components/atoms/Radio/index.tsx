import React, { useId } from 'react';

import Typography from '../Typography';

import mapModifiers from 'utils/functions';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({
    type = 'checkbox', text, children, required, ...inputProps
  }, ref) => {
    const id = useId();

    return (
      <label htmlFor={id} className={mapModifiers('a-radio', required && 'required')}>
        <input
          {...inputProps}
          type={type}
          ref={ref}
          id={id}
          className="a-radio_input"
        />
        <span className="a-radio_holder" />
        {text && (
          <span className="a-radio_label">
            <Typography.Text modifiers={['14x16']}>{text}</Typography.Text>
          </span>
        )}
      </label>
    );
  }
);

export default Radio;
