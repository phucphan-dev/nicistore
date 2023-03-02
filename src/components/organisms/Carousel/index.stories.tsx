import { Story, Meta } from '@storybook/react';
import React from 'react';

import Carousel, { NextArrow, PrevArrow } from '.';

export default {
  title: 'Components/organisms/Carousel',
  component: Carousel,
  argTypes: {
    arrows: {
      control: {
        type: 'select',
        options: [true, false],
      },
    },
  },
} as Meta;
const settingBanner = {
  dots: true,
  dotsClass: 'slick-dots o-carousel_dots-banner',
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow extendClassname="slick-arrow-banner" />,
  nextArrow: <NextArrow extendClassname="slick-arrow-banner" />,
  infinite: false,
  cssEase: 'ease-in-out',
  customPaging() {
    return (
      <span className="o-carousel_dots_main-banner" />
    );
  },
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};
export const banner: Story = () => (
  <div style={{ padding: '80px' }}>
    <Carousel settings={settingBanner}>
      <div><img width="100%" src="https://klbtheme.com/clotya/wp-content/uploads/2022/05/slider-06.jpg" /></div>
      <div><img width="100%" src="https://klbtheme.com/clotya/wp-content/uploads/2022/05/slider-06.jpg" /></div>
      <div><img width="100%" src="https://klbtheme.com/clotya/wp-content/uploads/2022/05/slider-06.jpg" /></div>
    </Carousel>
  </div>
);

const settingDefault = {
  dots: true,
  dotsClass: 'slick-dots o-carousel_dots',
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PrevArrow extendClassname="arrow" />,
  nextArrow: <NextArrow extendClassname="arrow" />,
  infinite: false,
  cssEase: 'ease-in-out',
  customPaging() {
    return (
      <span className="o-carousel_dots_main" />
    );
  },
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export const normal: Story = ({ arrows }) => (
  <div style={{
    paddingBottom: '60px',
    backgroundColor: '#fff',
    marginLeft: '60px',
    marginRight: '60px',
  }}
  >
    <Carousel settings={Object.assign(settingDefault, { arrows })}>
      <div>a</div>
      <div>b</div>
      <div>c</div>
      <div>a</div>
      <div>b</div>
      <div>c</div>
      <div>a</div>
      <div>b</div>
      <div>c</div>
    </Carousel>
  </div>
);
