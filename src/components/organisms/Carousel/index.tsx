/* eslint-disable react/jsx-indent */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ReactSlick, { CustomArrowProps, Settings } from 'react-slick';

import mapModifiers from 'utils/functions';

export interface CarouselProps {
  settings?: Settings;
  asNavFor?: ReactSlick;
  ref?: React.RefObject<ReactSlick>;
  children: React.ReactNode;
  centerMode?: boolean;
}

export const PrevArrow: React.FC<
  CustomArrowProps & { extendClassname?: string }
> = ({
  className, onClick, extendClassname = '',
}) => (
    <div
      className={`${className} ${extendClassname} o-carousel_prevArrow`}
      onClick={onClick}
    />
  );

export const NextArrow: React.FC<
  CustomArrowProps & { extendClassname?: string, lightTheme?: boolean }
> = ({
  className, onClick, extendClassname = '', lightTheme,
}) => (
    <div
      className={`${className} ${extendClassname} o-carousel_nextArrow${lightTheme ? ' light' : ''}`}
      onClick={onClick}
    />
  );

const Carousel = React.forwardRef<ReactSlick, CarouselProps>(
  ({
    settings, children, asNavFor, centerMode,
  }, ref) => {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
      <div className={mapModifiers('o-carousel', centerMode && 'centermode', settings?.arrows && 'hasarrow')}>
        <ReactSlick
          centerPadding="0"
          {...settings}
          {...(asNavFor && { asNavFor })}
          beforeChange={(_, next) => setActiveSlide(next)}
          ref={ref}
        >
          {React.Children.map(children, (item, idx) => (
            <div
              className="o-carousel_wrap"
              key={`carousel-${idx.toString()}`}
              hidden={activeSlide !== idx ? true : undefined}
            >
              <div className="o-carousel_item">{item}</div>
            </div>
          ))}
        </ReactSlick>
      </div>
    );
  },
);

Carousel.defaultProps = {
  settings: {
    infinite: true,
    dots: true,
    dotsClass: 'o-carousel_dots',
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    cssEase: 'ease-in-out',
  },
};

export default Carousel;
