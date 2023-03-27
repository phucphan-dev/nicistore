import React, {
  useCallback, useEffect, useRef, useState
} from 'react';

import Button from 'components/atoms/Button';
import { renderPrice } from 'utils/functions';

interface InputResult { min: number; max: number; }
interface FilterRangeProps {
  label: string;
  unit: string;
  minValue: number;
  maxValue: number;
  handleFilter: (val: InputResult) => void;
  defaultValue?: InputResult;
}

const FilterRange: React.FC<FilterRangeProps> = ({
  label,
  unit,
  minValue,
  maxValue,
  defaultValue,
  handleFilter,
}) => {
  const [minValueChange, setMinValueChange] = useState(defaultValue?.min || minValue);
  const [maxValueChange, setMaxValueChange] = useState(defaultValue?.max || maxValue);
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
      <div className="o-inputRange_head">
        <div className="o-inputRange_head_rangeNumber">
          {label}
          :
          {' '}
          <span>
            {renderPrice(Math.min(minValueChange, maxValueChange), true)}
          </span>
          &nbsp;
          -
          &nbsp;
          <span>
            {renderPrice(Math.max(minValueChange, maxValueChange), true)}
            {' '}
            {unit}
          </span>
        </div>
        <div className="o-inputRange_head_button">
          <Button
            variant="secondary"
            onClick={() => handleFilter({
              min: Math.min(minValueChange, maxValueChange),
              max: Math.max(minValueChange, maxValueChange)
            })}
          >
            Lọc
          </Button>
        </div>
      </div>
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

export default FilterRange;
