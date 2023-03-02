import React from 'react';

interface SectionProps {
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => (
  <div className="o-section">{children}</div>
);

Section.defaultProps = {
  children: undefined,
};

export default Section;
