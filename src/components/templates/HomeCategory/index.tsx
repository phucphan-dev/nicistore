import React from 'react';

import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import Animate from 'components/organisms/Animate';
import Container from 'components/organisms/Container';
import mapModifiers from 'utils/functions';

export interface HomeCategoryData {
  name: string;
  description?: string;
  totalProduct?: number;
  thumbnail: string;
  ratio: RatioImage;
  href: string;
  items?: { name: string, href: string }[];
}

interface HomeCategoryProps {
  categories: HomeCategoryData[];
}

const HomeCategory: React.FC<HomeCategoryProps> = ({ categories }) => {
  const renderItem = (item: HomeCategoryData, index?: number) => (
    <div className="t-homeCategory_item" key={index ? item.name + index.toString() : undefined}>
      <Animate type="slideInUp">
        <div className={mapModifiers('t-homeCategory_placeholder', item.ratio)} />
        <div className="t-homeCategory_content">
          {item.totalProduct && (
            <div className="t-homeCategory_total">
              <Typography.Text modifiers={['13x16']}>
                {item.totalProduct}
                {' '}
                Products
              </Typography.Text>
            </div>
          )}
          <div className="t-homeCategory_name">
            <Link href={item.href}>
              <Typography.Heading type="h2" modifiers={['28x32']}>
                {item.name}
              </Typography.Heading>
            </Link>
          </div>
          {item.description && (
            <div className="t-homeCategory_description">
              <Typography.Text modifiers={['16x18']}>
                {item.description}
              </Typography.Text>
            </div>
          )}
          {item.items && (
            <div className="t-homeCategory_items">
              {item.items.map((type) => (
                <div className="t-homeCategory_itemLink" key={type.href}>
                  <Link href={type.href} key={`category-${item.name}-${type}`} aria-label={type.name}>
                    <Typography.Text modifiers={['14x16']}>
                      {type.name}
                    </Typography.Text>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </Animate>
    </div>
  );

  if (categories.length === 0) {
    return null;
  }
  return (
    <Container>
      <div className="t-homeCategory">
        <div className="t-homeCategory_left">
          {renderItem(categories[0])}
        </div>
        <div className="t-homeCategory_right">
          {
            categories.slice(1).map((item, index) => renderItem(item, index))
          }
        </div>
      </div>
    </Container>
  );
};

export default HomeCategory;
