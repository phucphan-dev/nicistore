import React, { useState } from 'react';

import Image from 'components/atoms/Image';
import useDeviceQueries from 'hooks/useDeviceQueries';

interface ImagePreviewProps {
  imgSrc: string;
  alt: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imgSrc, alt }) => {
  const [position, setPosition] = useState('0% 0%');
  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const {
      left, top, width, height
    } = e.currentTarget.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setPosition(`${x}% ${y}%`);
  };

  const { isMobile } = useDeviceQueries();

  return (
    <div className="o-imagePreview">
      <figure
        className="o-imagePreview_figure"
        onMouseMove={(e) => !isMobile && handleMouseMove(e)}
        style={{ backgroundImage: `url(${imgSrc})`, backgroundPosition: position }}
      >
        <div className="o-imagePreview_image">
          <Image imgSrc={imgSrc} alt={alt} ratio="1x1" />
        </div>
      </figure>
    </div>
  );
};

export default ImagePreview;
