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
    handleChange({
      min: Math.min(minValueChange, maxValueChange),
      max: Math.max(minValueChange, maxValueChange)
    });
  }, [maxValueChange, minValueChange, getPercent, handleChange]);

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
          onChange={(e) => setMinValueChange(Number(e.target.value))}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={maxValueChange}
          className="o-inputRange_inputMax"
          onChange={(e) => setMaxValueChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default InputRange;
