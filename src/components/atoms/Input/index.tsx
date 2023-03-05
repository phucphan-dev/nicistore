import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  label?: string;
  error?: string;
  labelHtml?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id, label, error, labelHtml, ...props
}) => (
  <div className="a-input">
    {(labelHtml || label) && (
      <label htmlFor={id} className="a-input_label">
        {labelHtml || label}
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
