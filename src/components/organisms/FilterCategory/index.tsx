import React, { useState } from 'react';

import Checkbox from 'components/atoms/Checkbox';
import Typography from 'components/atoms/Typography';
import mapModifiers from 'utils/functions';

interface FilterCategoryProps {
  initParams?: string[];
  categories: CategoryData[];
  handleChange?: (code: string[]) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  initParams,
  categories, handleChange
}) => {
  const [selected, setSelected] = useState<string[]>(initParams || []);
  const [active, setActive] = useState<string[]>([]);
  const onChangeSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    code: string,
  ) => {
    if (e.currentTarget.checked) {
      const result = [...selected, code];
      setSelected(result);
      if (handleChange) {
        handleChange(result);
      }
    } else {
      const result = selected.filter((item) => item !== code);
      setSelected(result);
      if (handleChange) {
        handleChange(result);
      }
    }
  };

  const expandCategories = (code: string) => {
    if (active.includes(code)) setActive(active.filter((item) => item !== code));
    else setActive([...active, code]);
  };

  return (
    <div className="o-filterCategory">
      {categories.map((item) => (
        <div
          className={mapModifiers('o-filterCategory_item', active.includes(item.code) && 'active')}
          key={item.code}
        >
          <Checkbox
            name={item.code}
            checked={selected.includes(item.code)}
            onChange={(e) => onChangeSelected(e, item.code)}
          >
            {item.name}
          </Checkbox>
          {item.childrens && (
            <>
              <div className="o-filterCategory_icon" onClick={() => expandCategories(item.code)}>
                <Typography.Text modifiers={['500']}>
                  {active.includes(item.code) ? '-' : '+'}
                </Typography.Text>
              </div>
              <div className="o-filterCategory_childrens">
                {item.childrens.map((child) => (
                  <div className="o-filterCategory_item" key={child.code}>
                    <Checkbox
                      name={child.code}
                      onChange={(e) => onChangeSelected(e, child.code)}
                    >
                      {child.name}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterCategory;
