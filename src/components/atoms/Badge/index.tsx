import React from 'react';

import mapModifiers from 'utils/functions';

interface BadgeProps {
  content: string;
  isOnSale?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ content, isOnSale }) => (
  <div className={mapModifiers('a-badge', isOnSale && 'onsale')}>
    <span className="a-badge_content">{content}</span>
  </div>
);

Badge.defaultProps = {
};

export default Badge;
