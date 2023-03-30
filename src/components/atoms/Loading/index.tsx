import React from 'react';

import logoC from 'assets/images/logo_c.svg';
import logoI from 'assets/images/logo_i.svg';
import logoN from 'assets/images/logo_n.svg';
import useWindowDimensions from 'hooks/useWindowDemensions';
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

export const LoadingMain: React.FC = () => {
  const { width, height } = useWindowDimensions();
  return (
    <div className="a-loadingMain" style={{ width: `${width}px`, height: `${height}px` }}>
      <img src={logoN} alt="N" />
      <img src={logoI} alt="i" />
      <img src={logoC} alt="C" />
      <img src={logoI} alt="i" />
    </div>
  );
};

export default Loading;
