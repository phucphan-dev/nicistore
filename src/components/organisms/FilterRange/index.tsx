/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useCallback, useEffect, useRef, useState
} from 'react';

import { renderValue } from 'utils/functions';

// import { renderValue } from 'utils/functions';

interface InputRangeProps {
  minValue: number,
  maxValue: number,
  onChange: (val: { min: string | number; max: string | number; }) => void;
  defaultValue?: {
    min: number;
    max: number;
  };
  handleSubmit?: () => void;
}

const InputRange: React.FC<InputRangeProps> = ({
  minValue,
  maxValue,
  onChange,
  defaultValue,
  handleSubmit
}) => {
  const [minValueChange, setMinValueChange] = useState(0);
  const [maxValueChange, setMaxValueChange] = useState(0);
  const rangeRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(0);

  const getPercent = useCallback(
    (value: number) => ((value - minValue) / (maxValue - minValue)) * 100,
    [minValue, maxValue]
  );

  useEffect(() => {
    if (rangeRef.current) {
      // const minPercent = getPercent(minValueChange);
      // const maxPercent = getPercent(maxValueChange);
      const minPercent = getPercent(Math.min(minValueChange, maxValueChange));
      const maxPercent = getPercent(Math.max(minValueChange, maxValueChange));
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxValueChange, minValueChange, defaultValue]);

  useEffect(() => {
    if (defaultValue) {
      setMaxValueChange(defaultValue.max);
      setMinValueChange(defaultValue.min || minValue);
    }
  }, [defaultValue, maxValue, minValue]);

  return (
    <div className="o-inputRange">
      <div className="o-inputRange_head">
        <div className="o-inputRange_head_rangeNumber">
          Price:
          {' '}
          <span>
            $
            {renderValue(Math.min(minValueChange, maxValueChange), true)}
          </span>
          &nbsp;
          —
          &nbsp;
          <span>
            $
            {renderValue(Math.max(minValueChange, maxValueChange), true)}
          </span>
        </div>
        <button type="button" onClick={handleSubmit}>filter</button>
      </div>
      <div className="o-inputRange_wrapper">
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={minValueChange}
          style={{ zIndex: focus === 1 ? 4 : 3 }}
          onFocus={() => setFocus(1)}
          className="o-inputRange_inputMin"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            // const value = Math.min(+event.target.value, maxValueChange);
            const value = +event.target.value;
            setMinValueChange(value);
            onChange({
              min: Math.min(value, maxValueChange),
              max: Math.max(maxValueChange, value)
            });
          }}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={maxValueChange}
          style={{ zIndex: focus === 2 ? 4 : 3 }}
          onFocus={() => setFocus(2)}
          className="o-inputRange_inputMax"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            // const value = Math.max(+event.target.value, minValueChange);
            const value = +event.target.value;
            setMaxValueChange(value);
            onChange({
              min: Math.min(value, maxValueChange),
              max: Math.max(maxValueChange, value)
            });
          }}
        />
        <div className="o-inputRange_slider">
          <div className="o-inputRange_slider-track" />
          <div ref={rangeRef} className="o-inputRange_slider-range" />
        </div>
      </div>
    </div>
  );
};

export default InputRange;
