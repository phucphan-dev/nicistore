import React, { forwardRef } from 'react';

import Typography from '../Typography';

import mapModifiers from 'utils/functions';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const TextAreaRef: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = ({
  label, error, placeholder, rows, id, required, ...innerProps
}, ref) => (
  <div className={mapModifiers(
    'a-textarea',
    error && 'error',
  )}
  >
    {label && (
      <label htmlFor={id} className="a-input_label">
        <Typography.Text type="span" modifiers={['14x16']}>{label}</Typography.Text>
        {required && <Typography.Text type="span" modifiers={['14x16', 'ferrariRed']}>*</Typography.Text>}
      </label>
    )}
    <div className="a-textarea_wrap">
      <textarea
        {...innerProps}
        className="a-textarea_input"
        placeholder={placeholder}
        rows={rows}
        ref={ref}
      />
    </div>
    {error && (
      <span className={mapModifiers('a-textarea_error')}>{error}</span>
    )}
  </div>
);

const TextArea = forwardRef(TextAreaRef);

export default TextArea;
