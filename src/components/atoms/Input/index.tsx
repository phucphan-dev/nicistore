import React, { InputHTMLAttributes } from 'react';

import Typography from '../Typography';

import mapModifiers from 'utils/functions';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  label?: string;
  error?: string;
  labelHtml?: React.ReactNode;
  bordered?: boolean;
}

const Input: React.FC<InputProps> = ({
  id, label, error, labelHtml, bordered, required, ...props
}) => (
  <div className={mapModifiers('a-input', bordered && 'bordered')}>
    {(labelHtml || label) && (
      <label htmlFor={id} className="a-input_label">
        <Typography.Text type="span" modifiers={['14x16']}>{labelHtml || label}</Typography.Text>
        {required && <Typography.Text type="span" modifiers={['14x16', 'ferrariRed']}> *</Typography.Text>}
      </label>
    )}
    <input id={id} className="a-input_ele" {...props} />
    {
      error && (
        <div className="a-input_error">
          {error}
        </div>
      )
    }
  </div>
);

Input.defaultProps = {
  children: undefined,
};

export default Input;
