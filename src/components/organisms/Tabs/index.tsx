import React, { useState, Children } from 'react';

import mapModifiers from 'utils/functions';

type Modifiers = 'underline' | 'center';
interface TabsProps {
  tabs: React.ReactNode[];
  modifiers?: Modifiers[];
  children?: React.ReactNode;
  handleIndex?: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  children, tabs, modifiers, handleIndex
}) => {
  const [active, setActive] = useState(0);
  return (
    <div className={mapModifiers('o-tabs', modifiers)}>
      <div className="o-tabs_labels">
        {tabs.map((item, idx) => (
          <div
            onClick={() => {
              setActive(idx);
              if (handleIndex) {
                handleIndex(idx);
              }
            }}
            key={`tabs-${idx.toString()}`}
            className={mapModifiers('o-tabs_tab', active === idx && 'active')}
          >
            <div className="o-tabs_label">{item}</div>
          </div>
        ))}
      </div>
      {Children.toArray(children).map((item, idx) => <div className={mapModifiers('o-tabs_panel', active === idx && 'active')} key={`tabspanel-${idx.toString()}`}>{item}</div>)}
    </div>
  );
};

export default Tabs;
