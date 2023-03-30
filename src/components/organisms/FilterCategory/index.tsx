import React, { useEffect, useState } from 'react';

import Checkbox from 'components/atoms/Checkbox';
import Typography from 'components/atoms/Typography';
import mapModifiers from 'utils/functions';

interface FilterCategoryProps {
  initCode?: string;
  categories: CategoryData[];
  handleChange?: (code?: string) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  initCode, categories, handleChange
}) => {
  const [selected, setSelected] = useState(initCode);
  const [active, setActive] = useState<string[]>([]);
  const onChangeSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    code: string,
  ) => {
    if (e.currentTarget.checked) {
      setSelected(code);
      if (handleChange) {
        handleChange(code);
      }
    }
  };

  const expandCategories = (code: string) => {
    if (active.includes(code)) setActive(active.filter((item) => item !== code));
    else setActive([...active, code]);
  };

  useEffect(() => {
    const activeInit = categories.find((
      item
    ) => item.childrens?.some((it) => it.code === initCode));
    if (activeInit) {
      setActive([activeInit.code]);
    }
    setSelected(initCode);
  }, [categories, initCode]);

  return (
    <div className="o-filterCategory">
      {categories.map((item) => (
        <div
          className={mapModifiers('o-filterCategory_item', active.includes(item.code) && 'active')}
          key={item.code}
        >
          <Checkbox
            name={item.code}
            checked={selected === item.code}
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
                      checked={selected === child.code}
                      onChange={(e) => onChangeSelected(e, child.code)}
                    >
                      {child.name}
                    </Checkbox>
                    {child.childrens && (
                      <div className="o-filterCategory_childrens">
                        {child.childrens.map((child2) => (
                          <div className="o-filterCategory_item" key={child2.code}>
                            <Checkbox
                              name={child2.code}
                              checked={selected === child2.code}
                              onChange={(e) => onChangeSelected(e, child2.code)}
                            >
                              {child2.name}
                            </Checkbox>
                          </div>
                        ))}
                      </div>
                    )}
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
