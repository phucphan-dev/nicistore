import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { productStatusDummy } from 'assets/dummy/filters';
import Checkbox from 'components/atoms/Checkbox';
import ColorSelect from 'components/atoms/ColorSelect';
import Typography from 'components/atoms/Typography';
import FilterCategory from 'components/organisms/FilterCategory';
import FilterRange from 'components/organisms/FilterRange';

interface FilterProductProps {
  categories: CategoryData[];
  colors: ColorFilter[];
  sizes: SizeFilter[];
}

const FilterProduct: React.FC<FilterProductProps> = ({ categories, colors, sizes }) => {
  const navigation = useNavigate();
  const { category } = useParams<{ category: string }>();
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
            maxValue={20000000}
            handleFilter={(value) => console.log({ value })}
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
                onChange={(e) => e.currentTarget.checked && console.log(item.code)}
              />
              <Typography.Text modifiers={['13x16', 'cadetGrey']}>
                (
                {item.count}
                )
              </Typography.Text>
            </div>
          )))}
        </div>
      </div>
      <div className="t-filterProduct_section">
        <Typography.Heading type="h4" modifiers={['16x18']}>Kích cỡ</Typography.Heading>
        <div className="t-filterProduct_content">
          {sizes.map(((item) => (
            <div className="t-filterProduct_size" key={item.code}>
              <Checkbox name={item.code}>{item.label}</Checkbox>
              <Typography.Text modifiers={['13x16', 'cadetGrey']}>
                (
                {item.count}
                )
              </Typography.Text>
            </div>
          )))}
        </div>
      </div>
      <div className="t-filterProduct_section">
        <Typography.Heading type="h4" modifiers={['16x18']}>Trạng thái</Typography.Heading>
        <div className="t-filterProduct_content">
          {productStatusDummy.map(((item) => (
            <div className="t-filterProduct_size" key={item.value}>
              <Checkbox name={item.value}>{item.label}</Checkbox>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
