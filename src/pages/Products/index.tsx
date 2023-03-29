/* eslint-disable no-nested-ternary */
import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { sortOptionDummy } from 'assets/dummy/filters';
import { featuredProducts } from 'assets/dummy/homepage';
import Button from 'components/atoms/Button';
// import Image from 'components/atoms/Image';
import Link from 'components/atoms/Link';
import Loading from 'components/atoms/Loading';
import Select from 'components/atoms/Select';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Pagination from 'components/organisms/Pagination';
import ProductCard, { ProductInfoData } from 'components/organisms/ProductCard';
import FilterProduct, { FilterProductProperties } from 'components/templates/FilterProduct';
import FooterProduct from 'components/templates/FooterProduct';
import { getAllProductService, getProductCategoryDetailService } from 'services/product';
import { FilterSortParams, PropertiesProductFilter } from 'services/product/types';
import { useAppSelector } from 'store/hooks';
import mapModifiers, { groupMenusCategoriesFilter } from 'utils/functions';

const Products: React.FC = () => {
  const { pathname } = useLocation();
  const { category } = useParams<{ category: string }>();
  const categories = useAppSelector((state) => state.product.categories);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page'));

  const [open, setOpen] = useState(false);
  const [sorter, setSorter] = useState<OptionType>();
  const [page, setPage] = useState(pageParam || 1);
  const [propertiesFilter, setPropertiesFilter] = useState<PropertiesProductFilter>({});

  const sorterParams: FilterSortParams | undefined = useMemo(() => {
    if (!sorter) {
      return undefined;
    }
    switch (sorter?.value) {
      case 'priceDecrease':
        return {
          sortBy: 'price',
          sortType: 'DESC'
        };
      case 'priceIncrease':
        return {
          sortBy: 'price',
          sortType: 'ASC'
        };
      case 'newest':
        return {
          sortBy: 'createdAt',
          sortType: 'DESC'
        };
      default:
        return {
          sortBy: 'createdAt',
          sortType: 'ASC'
        };
    }
  }, [sorter]);

  const { data: categoryDetail, isLoading: getCategoryLoading } = useQuery(
    ['getProductCategoryDetail', category],
    () => {
      if (category) {
        return getProductCategoryDetailService(category);
      }
      return undefined;
    },
    { enabled: !!category }
  );

  const { data, isLoading } = useQuery(
    ['getAllProduct', category, sorterParams, page, propertiesFilter],
    () => getAllProductService({
      categoryIds: categories?.find(
        (item) => item.slug === category
      )?.id.toString(),
      ...sorterParams,
      limit: 12,
      page,
      ...propertiesFilter
    }),
    { enabled: !!categories }
  );

  const productsMemo: ProductInfoData[] = useMemo(() => (data
    ? data.data.map((item) => ({
      slug: item.slug,
      code: item.code,
      images: [item.thumbnail],
      promo: item.salePercent,
      name: item.name,
      price: item.price,
      unit: 'VNĐ',
      starCount: 5,
      reviewCount: Math.floor(Math.random() * 10),
      available: item.stock,
      solded: 21,
    })) : []), [data]);

  const handleFilterProperties = useCallback((
    filter: FilterProductProperties
  ) => setPropertiesFilter(
    { ...filter, colorIds: filter.colorIds?.join(','), sizeIds: filter.sizeIds?.join(',') }
  ), []);

  useEffect(() => {
    if (!pageParam) {
      setPage(1);
    }
    setOpen(false);
  }, [pageParam, pathname]);

  return (
    <div className="p-products">
      <Container>
        <Row>
          <Col lg={3}>
            <div className={mapModifiers('p-products_sidebar', open && 'open')}>
              <div className="p-products_sidebar_title">
                <Typography.Heading type="h3" modifiers={['14x16', '500']}>Bộ lọc</Typography.Heading>
                <div className="p-products_sidebar_close">
                  <Button iconName="close" variant="whiteBorder" iconSize="16" handleClick={() => setOpen(false)} />
                </div>
              </div>
              <FilterProduct
                categories={groupMenusCategoriesFilter(categories)}
                colors={categoryDetail ? categoryDetail?.colors.map((item) => (
                  { code: item.colorId.toString(), color: item.code, label: item.name })) : []}
                sizes={categoryDetail ? categoryDetail?.sizes.map((item) => (
                  { code: item.sizeId.toString(), color: item.code, label: item.name })) : []}
                handleFilter={handleFilterProperties}
              />
            </div>
          </Col>
          <Col lg={9}>
            <div className="p-products_content">
              {/* <div className="p-products_banner">
                <Image
                  imgSrc="https://k4j3j2s7.rocketcdn.me/clotya/wp-content/uploads/2022/05/banner-26.jpg"
                  alt="Product Banner"
                  ratio="921x329"
                />
                <div className="p-products_banner_content">
                  <Typography.Heading type="h2" modifiers={['38x42', '400']}>
                    Plus-Size Styles for Every Season
                  </Typography.Heading>
                  <div className="p-products_banner_text">
                    <Typography.Text modifiers={['16x18']}>
                      Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
                    </Typography.Text>
                  </div>
                </div>
              </div> */}
              <div className="p-products_controls">
                <div className="p-products_controls-left">
                  <Button iconName="filter" iconSize="24" handleClick={() => setOpen(true)}>
                    <Typography.Text>Bộ lọc</Typography.Text>
                  </Button>
                </div>
                <div className="p-products_controls-right">
                  <Typography.Text>Sắp xếp: </Typography.Text>
                  <Select
                    name="sort"
                    placeholder="Chọn.."
                    modifier={['bordered']}
                    options={sortOptionDummy}
                    value={sorter}
                    handleSelect={(option) => setSorter(option)}
                  />
                </div>
              </div>
              {isLoading || getCategoryLoading ? <Loading isShow /> : productsMemo.length > 0 ? (
                <div className="p-products_list">
                  {productsMemo.map((item, index) => (
                    <div className="p-products_item" key={item.code + index.toString()}>
                      <Link href={`/${category}/${item.slug}`}><ProductCard {...item} /></Link>
                    </div>
                  ))}
                </div>
              ) : <Typography.Text modifiers={['700', 'center']}>Đang cập nhật sản phẩm</Typography.Text>}
              <div className="p-products_pagination">
                <Pagination
                  totalPage={data?.meta.totalPages || 0}
                  pageCurrent={page}
                  handleChangePage={(val) => {
                    setPage(val);
                    setSearchParams({ page: val.toString() });
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
        <div className="p-products_related">
          <FooterProduct title="Đã xem gần đây" products={featuredProducts.slice(0, 4)} />
        </div>
      </Container>
    </div>
  );
};

export default Products;
