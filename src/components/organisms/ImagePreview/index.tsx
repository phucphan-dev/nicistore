import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import useWindowDimensions from 'hooks/useWindowDemensions';
import mapModifiers from 'utils/functions';

interface ImagePreviewProps {
  imgSrc: string;
  alt: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imgSrc, alt }) => {
  const { width: wWidth, height: wHeight } = useWindowDimensions();
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState('0% 0%');
  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const {
      left, top, width, height
    } = e.currentTarget.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setPosition(`${x}% ${y}%`);
  };

  return (
    <div className="o-imagePreview">
      <figure
        className="o-imagePreview_figure"
        onMouseMove={handleMouseMove}
        style={{ backgroundImage: `url(${imgSrc})`, backgroundPosition: position }}
      >
        <div className="o-imagePreview_image">
          <Image imgSrc={imgSrc} alt={alt} ratio="1x1" />
        </div>
      </figure>
      <div className="o-imagePreview_expanded" onClick={() => setZoom(true)}>
        <Icon iconName="expand" size="20" />
      </div>
      <div className={mapModifiers('o-imagePreview_previewer', zoom && 'active')} style={{ width: `${wWidth}px`, height: `${wHeight}px` }}>
        <TransformWrapper>
          <TransformComponent>
            <img src={imgSrc} alt={alt} />
          </TransformComponent>
        </TransformWrapper>
        <div className="o-imagePreview_close" onClick={() => setZoom(false)}>
          <Icon iconName="close" size="20" />
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
