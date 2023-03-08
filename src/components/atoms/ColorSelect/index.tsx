import React, { useId } from 'react';

import Typography from '../Typography';

interface ColorSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'radio' | 'checkbox';
  color: string;
  label?: string;
}

const ColorSelect = React.forwardRef<HTMLInputElement, ColorSelectProps>(
  ({
    type, color, label, ...inputProps
  }, ref) => {
    const id = useId();

    return (
      <label htmlFor={id} className="a-colorSelect">
        <input
          {...inputProps}
          type={type}
          ref={ref}
          id={id}
          className="a-colorSelect_input"
          style={{ backgroundColor: color }}
        />
        {label && (
          <span className="a-colorSelect_label">
            <Typography.Text modifiers={['14x16']}>{label}</Typography.Text>
          </span>
        )}
      </label>
    );
  }
);

ColorSelect.defaultProps = {
  type: 'radio'
};

export default ColorSelect;
