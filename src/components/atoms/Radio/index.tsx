import React, { useId } from 'react';

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
      <label htmlFor={id} className={mapModifiers('m-radio', required && 'required')}>
        <input
          {...inputProps}
          type={type}
          ref={ref}
          id={id}
          className="m-radio_input"
        />
        <span className="m-radio_holder" />
        {text && (
          <span className="m-radio_label">
            {text}
          </span>
        )}
      </label>
    );
  }
);

export default Radio;
