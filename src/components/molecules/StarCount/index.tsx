import React from 'react';

import Icon from 'components/atoms/Icon';

interface StarCountProps {
  count: number;
}

const StarCount: React.FC<StarCountProps> = ({ count }) => (
  <div className="m-starCount">
    {Array(count).fill(0).map((_, index) => (
      <Icon
        key={`star-${index.toString()}`}
        iconName="star"
        size="12"
      />
    ))}
  </div>
);

export default StarCount;
