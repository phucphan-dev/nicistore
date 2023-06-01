import React, { useState } from 'react';

import useDebounce from 'hooks/useDebounce';

interface QuantityInputProps {
  initQuantity?: number;
  value?: number;
  handleChange?: (quantity: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ initQuantity, value, handleChange }) => {
  const [quantity, setQuantity] = useState<string>(initQuantity?.toString() || '0');

  const handleChangeQuantity = (val: string) => {
    setQuantity(val);
  };

  useDebounce(() => {
    if (handleChange) {
      handleChange(Number(quantity));
    }
  }, 500, [quantity]);

  return (
    <div className="m-quantity">
      <button
        type="button"
        className="m-quantity_minus"
        onClick={() => handleChangeQuantity(Number(quantity) > 0 ? String(Number(quantity) - 1) : '0')}
      >
        <span />
      </button>
      <input
        type="number"
        className="m-quantity_input"
        value={value || quantity}
        onChange={(e) => handleChangeQuantity(e.currentTarget.value.charAt(0) === '0' ? e.currentTarget.value.slice(1) : e.currentTarget.value)}
      />
      <button type="button" className="m-quantity_plus" onClick={() => handleChangeQuantity(String(Number(quantity) + 1))}>
        <span />
      </button>
    </div>
  );
};

export default QuantityInput;
