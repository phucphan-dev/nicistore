/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';

import Typography from '../Typography';

import useClickOutside from 'hooks/useClickOutside';
import mapModifiers from 'utils/functions';

type Modifiers = 'nobackground' | 'bordered';

interface SelectProps {
  label?: string;
  modifier?: Modifiers[];
  name: string;
  placeholder: string;
  value?: OptionType;
  options: OptionType[];
  isSearch?: boolean;
  required?: boolean;
  error?: string;
  handleSelect?: (option: OptionType) => void;
}

const Select: React.FC<SelectProps> = ({
  modifier, label, required,
  name, placeholder, value, options, isSearch, handleSelect, error
}) => {
  const pulldownRef = useRef<HTMLDivElement>(null);
  const [optionData, setOptionData] = useState<OptionType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [txtSearch, setTxtSearch] = useState('');
  const toggling = () => setIsOpen(!isOpen);

  useClickOutside(pulldownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    if (txtSearch) {
      setOptionData(optionData.filter((option) => option.label.includes(txtSearch)));
    } else {
      setOptionData(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txtSearch]);

  useEffect(() => {
    setOptionData(options);
  }, [options]);

  return (
    <div className={mapModifiers('a-select', modifier)} ref={pulldownRef}>
      {label && (
        <label className="a-select_label">
          <Typography.Text type="span" modifiers={['14x16']}>{label}</Typography.Text>
          {required && <Typography.Text type="span" modifiers={['14x16', 'ferrariRed']}> *</Typography.Text>}
        </label>
      )}
      <div className="a-select_header" onClick={toggling}>
        {!txtSearch && <div className={`a-select_header_content${value ? '' : ' placeholder'}`}><span>{value ? value.label : placeholder}</span></div>}
        {isSearch && (
          <input
            name={name}
            className="a-select_search"
            value={txtSearch}
            onChange={(e) => setTxtSearch(e.currentTarget.value)}
          />
        )}
        <span className={isOpen ? 'a-select_arrow opened' : 'a-select_arrow'} />
      </div>
      {error && <div className="a-select_error">{error}</div>}
      {isOpen && (
        <div className="a-select_wrapper">
          <ul className="a-select_list">
            {optionData.length ? optionData.map(
              (option) => (
                <li
                  key={option.value}
                  className="a-select_item"
                  onClick={() => {
                    if (handleSelect) {
                      handleSelect(option);
                      setTxtSearch('');
                      setIsOpen(false);
                    }
                  }}
                >
                  {option.label}
                </li>
              ),
            ) : <li className="a-select_item none">No Option</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
