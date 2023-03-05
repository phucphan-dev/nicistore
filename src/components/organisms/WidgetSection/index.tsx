import React from 'react';

interface WidgetSectionProps {
  children?: React.ReactNode;
}

const WidgetSection: React.FC<WidgetSectionProps> = ({ children }) => (
  <div className="o-widgetSection">{children}</div>
);

WidgetSection.defaultProps = {
  children: undefined,
};

export default WidgetSection;
