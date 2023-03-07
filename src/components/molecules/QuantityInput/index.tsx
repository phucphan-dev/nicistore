import React, {
  ChangeEvent, useState, KeyboardEvent, useCallback
} from 'react';

interface QuantityInputProps {
  children?: React.ReactNode;
}

const QuantityInput: React.FC<QuantityInputProps> = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const onChangeQuantity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const regexIsNumber = /^[0-9]+$/;
    if (e.currentTarget.value && regexIsNumber.test(e.currentTarget.value)) {
      if (Number(e.currentTarget.value) >= Number.MAX_SAFE_INTEGER + 1) return;
      setQuantity(Number(e.currentTarget.value));
    }
  }, []);

  const onKeydown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace' && quantity < 10) {
      setQuantity(0);
    }
  }, [quantity]);

  return (
    <div className="m-quantity">
      <button type="button" className="m-quantity_minus" onClick={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}>
        <span />
      </button>
      <input className="m-quantity_input" defaultValue={0} value={quantity} onChange={onChangeQuantity} onKeyDown={onKeydown} />
      <button type="button" className="m-quantity_plus" onClick={() => setQuantity((prev) => prev + 1)}>
        <span />
      </button>
    </div>
  );
};

QuantityInput.defaultProps = {
  children: undefined,
};

export default QuantityInput;
