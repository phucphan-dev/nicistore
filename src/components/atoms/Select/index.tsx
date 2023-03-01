import React, { useRef, useState, useEffect } from 'react';

import useClickOutside from 'hooks/useClickOutside';
import mapModifiers from 'utils/functions';

type Modifiers = 'nobackground';
export interface OptionType {
  id: string;
  label: string;
  value: string;
}

interface SelectProps {
  modifier?: Modifiers;
  name: string;
  placeholder: string;
  value?: OptionType;
  options: OptionType[];
  isSearch?: boolean;
  handleSelect?: (option: OptionType) => void;
}

const Select: React.FC<SelectProps> = ({
  modifier,
  name, placeholder, value, options, isSearch, handleSelect,
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
    <div className={mapModifiers('m-select', modifier)} ref={pulldownRef}>
      <div className="m-select_header" onClick={toggling}>
        {!txtSearch && <div className={`m-select_header_content${value ? '' : ' placeholder'}`}><span>{value ? value.label : placeholder}</span></div>}
        {isSearch && (
          <input
            name={name}
            className="m-select_search"
            value={txtSearch}
            onChange={(e) => setTxtSearch(e.currentTarget.value)}
          />
        )}
        <span className={isOpen ? 'm-select_arrow opened' : 'm-select_arrow'} />
      </div>
      {isOpen && (
        <div className="m-select_wrapper">
          <ul className="m-select_list">
            {optionData.length ? optionData.map(
              (option) => (
                <li
                  key={option.id}
                  className="m-select_item"
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
            ) : <li className="m-select_item none">No Option</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
