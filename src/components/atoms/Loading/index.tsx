import React from 'react';

import mapModifiers from 'utils/functions';

interface LoadingProps {
  variant?: 'fullScreen' | 'default';
  isShow?: boolean;
  isFill?: boolean;
  size?: 'small' | 'default';
  isWhite?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  isShow = false,
  variant,
  isFill,
  size,
  isWhite
}) => {
  if (!isShow) return null;
  return (
    <div className={mapModifiers('a-loading', variant, isFill && 'filled', size, isWhite && 'white')}>
      <div className="a-loading_wrapper">
        <div className={mapModifiers('a-loading_tail', size)} />
      </div>
    </div>
  );
};

Loading.defaultProps = {
  variant: 'default',
  isShow: false,
  isFill: false,
  size: 'default',
};

export default Loading;
