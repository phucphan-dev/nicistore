import React, { useId } from 'react';

import Typography from '../Typography';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  sizeName: string;
}

const SizeSelect = React.forwardRef<HTMLInputElement, Props>(
  ({
    sizeName, ...inputProps
  }, ref) => {
    const id = useId();

    return (
      <label htmlFor={id} className="a-sizeSelect">
        <input
          {...inputProps}
          ref={ref}
          id={id}
          className="a-sizeSelect_input"
          hidden
        />
        <span className="a-sizeSelect_label">
          <Typography.Text modifiers={['14x16', '500']}>{sizeName}</Typography.Text>
        </span>
      </label>
    );
  }
);

export default SizeSelect;
