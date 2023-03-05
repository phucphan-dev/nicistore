import React from 'react';

import mapModifiers from 'utils/functions';

interface SectionProps {
  noSpace?: boolean;
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ noSpace, children }) => (
  <section className={mapModifiers('o-section', noSpace && 'nospace')}>{children}</section>
);

Section.defaultProps = {
  children: undefined,
};

export default Section;
