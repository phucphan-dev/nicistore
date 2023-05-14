import React, { InputHTMLAttributes, useRef } from 'react';

import Icon from '../Icon';
import Typography from '../Typography';

import mapModifiers from 'utils/functions';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  label?: string;
  error?: string;
  labelHtml?: React.ReactNode;
  bordered?: boolean;
  search?: boolean;
  prefix?: string;
  handleSearch?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  id, label, error, labelHtml, bordered, required, search, prefix, handleSearch, ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className={mapModifiers('a-input', bordered && 'bordered', search && 'search')}>
      {(labelHtml || label) && (
        <label htmlFor={id} className="a-input_label">
          <Typography.Text type="span" modifiers={['14x16']}>{labelHtml || label}</Typography.Text>
          {required && <Typography.Text type="span" modifiers={['14x16', 'ferrariRed']}> *</Typography.Text>}
        </label>
      )}
      <div className={mapModifiers('a-input_ele', prefix && 'prefix')}>
        {prefix && <Typography.Text modifiers={['14x16', '500']}>{prefix}</Typography.Text>}
        <input ref={ref} id={id} {...props} />
        {search && (
          <div
            className="a-input_icon"
            onClick={() => handleSearch && ref.current && handleSearch(ref.current?.value)}
          >
            <Icon size="24" iconName="search" />
          </div>
        )}
      </div>
      {
        error && (
          <div className="a-input_error">
            {error}
          </div>
        )
      }
    </div>
  );
};

Input.defaultProps = {
  children: undefined,
};

export default Input;
