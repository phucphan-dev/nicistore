import React from 'react';

import categoriesDummy, { colorsDummy, sizeDummy } from 'assets/dummy/filters';
import ColorSelect from 'components/atoms/ColorSelect';
import Typography from 'components/atoms/Typography';
import FilterCategory from 'components/organisms/FilterCategory';
import FilterRange from 'components/organisms/FilterRange';

interface FilterProductProps {

}

const FilterProduct: React.FC<FilterProductProps> = () => (
  <div className="t-filterProduct">
    <div className="t-filterProduct_section">
      <Typography.Heading type="h4" modifiers={['16x18']}>Product Categories</Typography.Heading>
      <div className="t-filterProduct_content">
        <FilterCategory categories={categoriesDummy} />
      </div>
    </div>
    <div className="t-filterProduct_section">
      <Typography.Heading type="h4" modifiers={['16x18']}>Filter by Price</Typography.Heading>
      <div className="t-filterProduct_content">
        <FilterRange
          label="Price"
          unit="VND"
          minValue={0}
          maxValue={20000000}
          handleFilter={(value) => console.log({ value })}
        />
      </div>
    </div>
    <div className="t-filterProduct_section">
      <Typography.Heading type="h4" modifiers={['16x18']}>Filter by Color</Typography.Heading>
      <div className="t-filterProduct_content">
        {colorsDummy.map(((item) => (
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
      <Typography.Heading type="h4" modifiers={['16x18']}>Filter by Size</Typography.Heading>
      <div className="t-filterProduct_content">
        {sizeDummy.map(((item) => (
          <div className="t-filterProduct_size" key={item.code}>

            <Typography.Text modifiers={['13x16', 'cadetGrey']}>
              (
              {item.count}
              )
            </Typography.Text>
          </div>
        )))}
      </div>
    </div>
  </div>
);

export default FilterProduct;
