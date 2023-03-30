import React, { useMemo } from 'react';
import { useQuery } from 'react-query';

import {
  bannerDummy, topSellerDummy
} from 'assets/dummy/homepage';
import Loading from 'components/atoms/Loading';
import Typography from 'components/atoms/Typography';
import DiscountCode from 'components/molecules/DiscountCode';
import Section from 'components/organisms/Section';
import WidgetSection from 'components/organisms/WidgetSection';
import FeaturedProduct from 'components/templates/FeaturedProduct';
import HomeBanner from 'components/templates/HomeBanner';
import HomeCategory, { HomeCategoryData } from 'components/templates/HomeCategory';
import TopSeller from 'components/templates/TopSeller';
import { getAllProductService } from 'services/product';
import { useAppSelector } from 'store/hooks';
import { groupMenusFromCategories } from 'utils/functions';

const Home: React.FC = () => {
  const categories = useAppSelector((state) => state.product.categories);
  const { data: featured, isLoading: featuredLoading } = useQuery(
    ['getFeaturedProduct'],
    () => getAllProductService({
      limit: 12,
      page: 1,
      featured: true
    }),
  );
  const { data: bestSeller, isLoading: bestSellerLoading } = useQuery(
    ['getBestSellerProduct'],
    () => getAllProductService({
      limit: 2,
      page: 1,
      isBestSeller: true
    }),
  );
  const featuredProducts = useMemo(() => (featured ? featured.data.map((item) => ({
    code: item.code,
    images: [item.thumbnail],
    promo: item.salePercent,
    name: item.name,
    price: item.price,
    unit: 'VNĐ',
    starCount: 5,
    reviewCount: 5,
    available: item.stock,
    solded: 21,
  })) : []), [featured]);

  const bestSellerProducts = useMemo(() => (bestSeller ? bestSeller.data.map((item) => ({
    code: item.code,
    images: [item.thumbnail],
    promo: item.salePercent,
    name: item.name,
    price: item.price,
    unit: 'VNĐ',
    starCount: 5,
    reviewCount: 5,
    available: item.stock,
    solded: 21,
  })) : []), [bestSeller]);

  const menus: HomeCategoryData[] = useMemo(() => {
    if (!categories) return [];
    const data = groupMenusFromCategories(categories);
    return [
      {
        name: data[2].text,
        thumbnail: 'https://k4j3j2s7.rocketcdn.me/clotya/wp-content/uploads/2022/05/banner-11.jpg',
        ratio: '272x289',
        items: data[2].childrens?.map((item) => ({
          name: item.text,
          href: `/${item.link}`
        }))
      },
      {
        name: data[1].text,
        thumbnail: 'https://k4j3j2s7.rocketcdn.me/clotya/wp-content/uploads/2022/05/banner-12.jpg',
        ratio: '34x17',
        items: data[1].childrens?.map((item) => ({
          name: item.text,
          href: `/${item.link}`
        }))
      },
      {
        name: data[3].text,
        thumbnail: 'https://k4j3j2s7.rocketcdn.me/clotya/wp-content/uploads/2022/05/banner-12.jpg',
        ratio: '257x274',
        items: data[3].childrens?.map((item) => ({
          name: item.text,
          href: `/${item.link}`
        }))
      },
      {
        name: data[4].text,
        thumbnail: 'https://k4j3j2s7.rocketcdn.me/clotya/wp-content/uploads/2022/05/banner-12.jpg',
        ratio: '257x274',
        items: data[4].childrens?.map((item) => ({
          name: item.text,
          href: `/${item.link}`
        }))
      },
    ];
  }, [categories]);

  if (featuredLoading || bestSellerLoading) {
    return <Loading isShow />;
  }

  return (
    <>
      <Section noSpace><HomeBanner banners={bannerDummy} /></Section>
      <Section>
        <TopSeller
          collection={topSellerDummy.collection}
          first={bestSellerProducts[0]}
          second={bestSellerProducts[1]}
        />
      </Section>
      <Section>
        <WidgetSection>
          <Typography.Text modifiers={['20x24', 'ferrariRed', 'center']}>
            Super discount for your
            {' '}
            <Typography.Text type="span" modifiers={['700']}>first purchase.</Typography.Text>
            {' '}
            <DiscountCode>FREE15FIRST</DiscountCode>
            {' '}
            <Typography.Text type="span" modifiers={['300', '16x18']}>Use discount code in checkout!</Typography.Text>
          </Typography.Text>
        </WidgetSection>
      </Section>
      <Section>
        <HomeCategory categories={menus} />

      </Section>
      <Section><FeaturedProduct products={featuredProducts} /></Section>
    </>
  );
};

export default Home;
