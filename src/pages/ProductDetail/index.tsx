/* eslint-disable react/no-danger */
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import Loading from 'components/atoms/Loading';
import Breadcrumb from 'components/molecules/Breadcrumb';
import Container from 'components/organisms/Container';
import Tabs from 'components/organisms/Tabs';
import FooterProduct from 'components/templates/FooterProduct';
// eslint-disable-next-line import/no-named-as-default
import ProductInfo from 'components/templates/ProductInfo';
import { getProductDetailService } from 'services/product';

const ProductDetail: React.FC = () => {
  const { product: slug } = useParams<{ product: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useQuery(
    ['getProductDetail', slug],
    () => {
      if (slug) {
        return getProductDetailService(slug);
      }
      return undefined;
    }
  );

  const productDetail: ProductInfo | undefined = useMemo(() => (data ? ({
    id: data.id,
    slug: `${data.categories.map((item) => `/${item.slug}`).join()}/${data.slug}`,
    code: data.code,
    images: data.galleries.map((item, idx) => (
      { id: idx, path: item.path })),
    name: data.name,
    shortDescription: data.shortDescription,
    description: data.description,
    promo: data.salePercent,
    price: data.price,
    unit: 'VNĐ',
    starCount: 5,
    reviewCount: 2,
    colorSize: data.colorSize,
    categories: data.categories.map((item) => item.name),
  }) : undefined), [data]);
  const breadcrumbs: BreadcrumbTypes[] = [
    {
      slug: '/',
      text: 'Trang chủ',
    },
    ...(!data ? [] : data.categories.map((item) => ({ slug: `/${item.slug}`, text: item.name }))),
    {
      slug: '',
      text: data?.name || ''
    }
  ];
  const featuredProducts = useMemo(() => (data ? data.relateds.map((item) => ({
    id: item.id,
    code: item.code,
    images: [item.thumbnail],
    name: item.name,
    price: item.price,
    unit: 'VNĐ',
    starCount: 3,
    reviewCount: 5,
    available: item.stock,
    solded: 21,
    isFavorited: item.isFavorited
  })) : []), [data]);
  return (
    <div className="p-productDetail">
      <Container>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        {isLoading ? <Loading isShow variant="fullScreen" /> : (
          <>
            <div className="p-productDetail_content">
              {productDetail && <ProductInfo {...productDetail} />}
            </div>
            <div className="p-productDetail_tabs">
              <Tabs tabs={['Mô tả sản phẩm']} modifiers={['underline']}>
                {productDetail && (
                  <div
                    className="p-productDetail_tabs_content"
                    dangerouslySetInnerHTML={
                      { __html: productDetail.description }
                    }
                  />
                )}
              </Tabs>
            </div>
            {featuredProducts.length > 0 && (
              <div className="p-productDetail_related">
                <FooterProduct title="Sản phẩm liên quan" products={featuredProducts} />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductDetail;
