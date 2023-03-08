/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useCallback, useEffect, useRef, useState
} from 'react';

interface InputResult { min: number; max: number; }
interface InputRangeProps {
  minValue: number;
  maxValue: number;
  handleChange: (val: InputResult) => void;
  defaultValue?: InputResult;
}

const InputRange: React.FC<InputRangeProps> = ({
  minValue,
  maxValue,
  defaultValue,
  handleChange,
}) => {
  const [minValueChange, setMinValueChange] = useState(defaultValue?.min || 0);
  const [maxValueChange, setMaxValueChange] = useState(defaultValue?.max || 0);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => ((value - minValue) / (maxValue - minValue)) * 100,
    [minValue, maxValue]
  );

  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(Math.min(minValueChange, maxValueChange));
      const maxPercent = getPercent(Math.max(minValueChange, maxValueChange));
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxValueChange, minValueChange, getPercent]);

  return (
    <div className="o-inputRange">
      <div className="o-inputRange_wrapper">
        <div className="o-inputRange_slider">
          <div className="o-inputRange_slider-track" />
          <div ref={rangeRef} className="o-inputRange_slider-range" />
        </div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={minValueChange}
          className="o-inputRange_inputMin"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > maxValueChange) setMaxValueChange(value);
            else setMinValueChange(value);
            handleChange({
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
          className="o-inputRange_inputMax"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value < minValueChange) setMinValueChange(value);
            else setMaxValueChange(value);
            handleChange({
              min: Math.min(value, maxValueChange),
              max: Math.max(maxValueChange, value)
            });
          }}
        />
      </div>
    </div>
  );
};

export default InputRange;
