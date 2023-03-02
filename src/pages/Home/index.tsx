import React from 'react';

import Typography from 'components/atoms/Typography';
import Header from 'components/organisms/Header';
import Section from 'components/organisms/Section';
import HomeBanner from 'components/templates/HomeBanner';
import TopSeller from 'components/templates/TopSeller';

const Home: React.FC = () => (
  <div className="p-home">
    <Header />
    <HomeBanner banners={[
      {
        subtitle: 'WINTER 2022 COLLECTION',
        title: 'Making someone feel pretty is an art',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        thumbnail: 'https://klbtheme.com/clotya/wp-content/uploads/2022/05/slider-06.jpg'
      },
      {
        subtitle: 'WINTER 2022 COLLECTION',
        title: 'Making someone feel pretty is an art',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        thumbnail: 'https://klbtheme.com/clotya/wp-content/uploads/2022/05/slider-04.jpg'
      },
      {
        subtitle: 'WINTER 2022 COLLECTION',
        title: 'Making someone feel pretty is an art',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        thumbnail: 'https://klbtheme.com/clotya/wp-content/uploads/2022/05/slider-05.jpg'
      },
    ]}
    />
    <div className="p-home_topSeller">
      <Section>
        <Typography.Heading type="h3" modifiers={['center', '30x36', '500']}>Best Seller Products</Typography.Heading>
        <div className="p-home_topSeller_description">
          <Typography.Text modifiers={['center', 'sonicSilver', '16x18']}>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Quis ipsum suspendisse
            ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </Typography.Text>
        </div>
      </Section>
      <TopSeller
        first={{
          code: 'C00001_00001',
          images: ['https://klbtheme.com/clotya/wp-content/uploads/2022/04/sleev1-500x750.jpeg'],
          promo: 12,
          name: 'Check Overshirt With Pocket Detail',
          price: 112,
          unit: '$',
          starCount: 3,
          reviewCount: 5,
          available: 79,
          solded: 21,
        }}
        second={{
          code: 'C00001_00001',
          images: ['https://klbtheme.com/clotya/wp-content/uploads/2022/04/leggings1-500x750.jpeg'],
          promo: 12,
          name: 'Check Overshirt With Pocket Detail',
          price: 112,
          unit: '$',
          starCount: 3,
          reviewCount: 5,
          available: 79,
          solded: 21,
        }}
        collection={
          {
            subtitle: 'WINTER 2022 COLLECTION',
            title: 'Valentin Paul Essential Collection',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
            thumbnail: 'https://klbtheme.com/clotya/wp-content/uploads/2022/05/banner-10.jpg'
          }
        }
      />
    </div>
  </div>
);

export default Home;
