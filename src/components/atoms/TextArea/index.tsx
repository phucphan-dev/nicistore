import React, { forwardRef } from 'react';

import mapModifiers from 'utils/functions';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const TextAreaRef: React.ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = ({
  error, placeholder, rows, ...innerProps
}, ref) => (
  <div className={mapModifiers(
    'a-textarea',
    error && 'error',
  )}
  >
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
