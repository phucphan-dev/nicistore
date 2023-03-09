import React, { useState } from 'react';

interface QuantityInputProps {
  initQuantity?: number;
  handleChange?: (quantity: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ initQuantity, handleChange }) => {
  const [quantity, setQuantity] = useState<string>(initQuantity?.toString() || '0');

  const handleChangeQuantity = (value: string) => {
    setQuantity(value);
    if (handleChange) {
      handleChange(Number(value));
    }
  };

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
        value={quantity}
        onChange={(e) => handleChangeQuantity(e.currentTarget.value.charAt(0) === '0' ? e.currentTarget.value.slice(1) : e.currentTarget.value)}
      />
      <button type="button" className="m-quantity_plus" onClick={() => handleChangeQuantity(String(Number(quantity) + 1))}>
        <span />
      </button>
    </div>
  );
};

export default QuantityInput;
