import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { productStatusDummy } from 'assets/dummy/filters';
import Checkbox from 'components/atoms/Checkbox';
import ColorSelect from 'components/atoms/ColorSelect';
import Typography from 'components/atoms/Typography';
import FilterCategory from 'components/organisms/FilterCategory';
import FilterRange from 'components/organisms/FilterRange';

export interface FilterProductProperties {
  sizeIds?: string[];
  colorIds?: string[];
  fromPrice?: number;
  toPrice?: number;
  stock?: boolean;
  hasSale?: boolean;
}
interface FilterProductProps {
  categories: CategoryData[];
  colors: ColorFilter[];
  sizes: SizeFilter[];
  handleFilter?: (params: FilterProductProperties) => void;
}

const FilterProduct: React.FC<FilterProductProps> = ({
  categories, colors, sizes, handleFilter
}) => {
  const navigation = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [filter, setFilter] = useState<FilterProductProperties>({});
  useEffect(() => {
    if (handleFilter) {
      handleFilter(filter);
    }
  }, [filter, handleFilter]);
  return (
    <div className="t-filterProduct">
      <div className="t-filterProduct_section">
        <Typography.Heading type="h4" modifiers={['16x18']}>Danh mục</Typography.Heading>
        <div className="t-filterProduct_content">
          <FilterCategory initCode={category} categories={categories} handleChange={(code) => navigation(code ? `/${code}` : '/')} />
        </div>
      </div>
      <div className="t-filterProduct_section">
        <Typography.Heading type="h4" modifiers={['16x18']}>Giá</Typography.Heading>
        <div className="t-filterProduct_content">
          <FilterRange
            label="Giá"
            unit="VND"
            minValue={0}
            maxValue={2000000}
            handleFilter={(value) => setFilter(
              { ...filter, fromPrice: value.min, toPrice: value.max }
            )}
          />
        </div>
      </div>
      <div className="t-filterProduct_section">
        <Typography.Heading type="h4" modifiers={['16x18']}>Màu sắc</Typography.Heading>
        <div className="t-filterProduct_content">
          {colors.map(((item) => (
            <div className="t-filterProduct_color" key={item.code}>
              <ColorSelect
                type="checkbox"
                color={item.color}
                label={item.label}
                onChange={(e) => setFilter(
                  {
                    ...filter,
                    colorIds: e.currentTarget.checked
                      ? [...(filter.colorIds || []), item.code]
                      : filter.colorIds?.filter((it) => it !== item.code)
                  }
                )}
              />
              {item.count && (
                <Typography.Text modifiers={['13x16', 'cadetGrey']}>
                  (
                  {item.count}
                  )
                </Typography.Text>
              )}
            </div>
          )))}
        </div>
      </div>
      <div className="t-filterProduct_section">
        <Typography.Heading type="h4" modifiers={['16x18']}>Kích cỡ</Typography.Heading>
        <div className="t-filterProduct_content">
          {sizes.map(((item) => (
            <div className="t-filterProduct_size" key={item.code}>
              <Checkbox
                name={item.code}
                onChange={(e) => setFilter(
                  {
                    ...filter,
                    sizeIds: e.currentTarget.checked
                      ? [...(filter.sizeIds || []), item.code]
                      : filter.sizeIds?.filter((it) => it !== item.code)
                  }
                )}
              >
                {item.label}
              </Checkbox>
              {item.count && (
                <Typography.Text modifiers={['13x16', 'cadetGrey']}>
                  (
                  {item.count}
                  )
                </Typography.Text>
              )}
            </div>
          )))}
        </div>
      </div>
      <div className="t-filterProduct_section">
        <Typography.Heading type="h4" modifiers={['16x18']}>Trạng thái</Typography.Heading>
        <div className="t-filterProduct_content">
          {productStatusDummy.map(((item) => (
            <div className="t-filterProduct_size" key={item.value}>
              <Checkbox
                name={item.value}
                onChange={(e) => setFilter({ ...filter, [item.value]: e.currentTarget.checked })}
              >
                {item.label}
              </Checkbox>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
