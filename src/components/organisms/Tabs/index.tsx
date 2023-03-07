import React, { useRef, useLayoutEffect } from 'react';

import mapModifiers, { handleScrollCenter } from 'utils/functions';

interface TabPanelProps {
  active?: boolean;
  children?: React.ReactNode;
}

interface TabProps {
  label?: string;
  active?: boolean;
  handleClick?: () => void;
}

interface TabsProps {
  variableMutate?: number | string;
  classTabsActive?: string;
  modifiers?: 'underlineActive';
  children?: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ active, children }) => (
  <div className={mapModifiers('o-tabs_panel', active && 'active')}>{children}</div>
);

export const Tab: React.FC<TabProps> = ({
  active, label, handleClick,
}) => (
  <div onClick={handleClick} className={mapModifiers('o-tabs_tab', active && 'active')}>
    <span className="o-tabs_label">{label}</span>
  </div>
);

export const Tabs: React.FC<TabsProps> = ({
  children, variableMutate, classTabsActive, modifiers,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    handleScrollCenter(ref, classTabsActive || '.o-tabs_tab-active');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variableMutate]);

  return (
    <div className={mapModifiers('o-tabs', modifiers)}>
      <div ref={ref} className="o-tabs_labels">
        {children}
      </div>
    </div>
  );
};

export default React.memo(Tabs);
