import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

interface ImageProps {
  imgSrc: string;
  alt?: string;
}

const Image: React.FC<ImageProps> = ({ imgSrc, alt }) => (
  <div className="a-image">
    <LazyLoadImage
      alt={alt}
      height="auto"
      effect="black-and-white"
      src={imgSrc}
      width="100%"
    />
  </div>
);

Image.defaultProps = {
  alt: undefined,
};

export default Image;
