import React, { useMemo } from 'react';
import { useQuery } from 'react-query';

import accessories from 'assets/images/accessories.jpg';
import phonecase from 'assets/images/case.jpg';
import man from 'assets/images/man.jpg';
import woman from 'assets/images/woman.jpg';
import Loading from 'components/atoms/Loading';
import Typography from 'components/atoms/Typography';
import DiscountCode from 'components/molecules/DiscountCode';
import Animate from 'components/organisms/Animate';
import Section from 'components/organisms/Section';
import WidgetSection from 'components/organisms/WidgetSection';
import BuyForMe from 'components/templates/BuyForMe';
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
      limit: 3,
      page: 1,
      isBestSeller: true
    }),
  );
  const featuredProducts = useMemo(() => (featured ? featured.data.map((item) => ({
    id: item.id,
    code: item.code,
    slug: item.slug,
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
    id: item.id,
    code: item.code,
    slug: item.slug,
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
        thumbnail: woman,
        ratio: '272x289',
        items: data[2].childrens?.map((item) => ({
          name: item.text,
          href: `/${item.link}`
        }))
      },
      {
        name: data[1].text,
        thumbnail: man,
        ratio: '34x17',
        items: data[1].childrens?.map((item) => ({
          name: item.text,
          href: `/${item.link}`
        }))
      },
      {
        name: data[3].text,
        thumbnail: accessories,
        ratio: '257x274',
        items: data[3].childrens?.map((item) => ({
          name: item.text,
          href: `/${item.link}`
        }))
      },
      {
        name: data[4].text,
        thumbnail: phonecase,
        ratio: '257x274',
        items: data[4].childrens?.map((item) => ({
          name: item.text,
          href: `/${item.link}`
        }))
      },
    ];
  }, [categories]);

  return (
    <>
      <Section noSpace><HomeBanner product={bestSeller?.data[0]} /></Section>
      {bestSellerLoading || featuredLoading ? <Loading isShow /> : (
        <>
          <Section>
            <TopSeller
              collection={{
                title: bestSellerProducts[0].name,
                thumbnail: bestSellerProducts[0].images[0],
                href: `/product-detail/${bestSellerProducts[0].slug}`
              }}
              first={bestSellerProducts[1]}
              second={bestSellerProducts[2]}
            />
          </Section>
          <Section>
            <Animate type="bounce">
              <WidgetSection>
                <Typography.Text modifiers={['20x24', 'ferrariRed', 'center']}>
                  Siêu ưu đãi dành cho
                  {' '}
                  <Typography.Text type="span" modifiers={['700']}>ĐƠN HÀNG ĐẦU TIÊN</Typography.Text>
                  {' '}
                  <DiscountCode>FREE15FIRST</DiscountCode>
                  <Typography.Text type="span" modifiers={['300', '16x18']}>
                    {'. '}
                    Sử dụng mã tại bước thanh toán!
                  </Typography.Text>
                </Typography.Text>
              </WidgetSection>
            </Animate>
          </Section>
          <Section>
            <HomeCategory categories={menus} />
          </Section>
          <Section><FeaturedProduct products={featuredProducts} /></Section>
          <Section noSpace>
            <BuyForMe />
          </Section>
        </>
      )}
    </>
  );
};

export default Home;
