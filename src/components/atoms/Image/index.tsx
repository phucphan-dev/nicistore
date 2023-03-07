import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import mapModifiers from 'utils/functions';

interface ImageProps {
  imgSrc: string;
  alt?: string;
  ratio?: RatioImage;
}

const Image: React.FC<ImageProps> = ({ imgSrc, alt, ratio }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={mapModifiers('a-image', ratio && `${ratio}`, loading && 'loading')}>
      <LazyLoadImage
        alt={alt}
        effect="black-and-white"
        src={imgSrc}
        afterLoad={() => setLoading(false)}
      />
    </div>
  );
};

Image.defaultProps = {
  alt: undefined,
};

export default Image;
