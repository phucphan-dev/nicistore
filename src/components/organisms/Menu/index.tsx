import React from 'react';

import Typography from 'components/atoms/Typography';

interface MenuProps {
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = () => (
  <div className="o-menu">
    <ul className="o-menu_list">
      <li className="o-menu_item">
        <a href="https://klbtheme.com/clotya/"><Typography.Text modifiers={['15x18']}>Home</Typography.Text></a>
        <ul className="o-menu_submenu">
          <li className="o-menu_item"><a href="https://klbtheme.com/clotya/"><Typography.Text modifiers={['15x18']}>Home 1</Typography.Text></a></li>
          <li className="o-menu_item"><a href="https://klbtheme.com/clotya/home-2/"><Typography.Text modifiers={['15x18']}>Home 2</Typography.Text></a></li>
          <li className="o-menu_item"><a href="https://klbtheme.com/clotya/home-3/"><Typography.Text modifiers={['15x18']}>Home 3</Typography.Text></a></li>
          <li className="o-menu_item"><a href="https://klbtheme.com/clotya/home-4/"><Typography.Text modifiers={['15x18']}>Home 4</Typography.Text></a></li>
          <li className="o-menu_item"><a href="https://klbtheme.com/clotya/home-5/"><Typography.Text modifiers={['15x18']}>Home 5</Typography.Text></a></li>
          <li className="o-menu_item"><a href="https://klbtheme.com/clotya/home-6/"><Typography.Text modifiers={['15x18']}>Home 6</Typography.Text></a></li>
        </ul>
      </li>
      <li className="o-menu_item">
        <a href="https://klbtheme.com/clotya/shop/">Shop</a>
        <ul className="o-menu_submenu">
          <li className="o-menu_item">
            <a href="https://klbtheme.com/clotya/shop/">Shop Lists</a>
            <ul className="o-menu_submenu">
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/">Shop Default</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?opt=right-sidebar">Shop Right Sidebar</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=5&amp;opt=wide">Shop Wide</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=5&amp;opt=full-width">Filters Area</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?shop_view=list_view">List Left Sidebar</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?ft=load-more">Load More Button</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?ft=infinite">Infinite Scrolling</a></li>
            </ul>
          </li>
          <li className="o-menu_item">
            <a href="https://klbtheme.com/clotya/product/basic-colored-sweatpants-with-elastic-hems/">Product Detail</a>
            <ul className="o-menu_submenu">
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/product/basic-colored-sweatpants-with-elastic-hems/">Product Variable</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/product/basic-high-neck-puff-jacket/">Product Default</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/product/brown-mountain-graphic-sweatshirt/">Product Grouped</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/product/cotton-and-linen-basic-shirt/">Product External</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/product/corduroy-bucket-hat/">Product Downloadable</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/product/ripstop-cargo-trousers-with-pockets/">Produt With Video</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/product/basic-colored-sweatpants-with-elastic-hems/?ft=recentfalse">Without Recently Viewed</a></li>
            </ul>
          </li>
          <li className="o-menu_item">
            <a href="#">Shop Pages</a>
            <ul className="o-menu_submenu">
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/cart/">Cart</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/checkout/">Checkout</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/my-account/">My account</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/wishlist/">Wishlist</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/order-tracking/">Order Tracking</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/furnob/shop/?orderby=popularity">Best Selling Products</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/terms-and-conditions/">Terms and Conditions</a></li>
            </ul>
          </li>
          <li className="o-menu_item">
            <a href="#">Shop Layouts</a>
            <ul className="o-menu_submenu">
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=2">Two Columns</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=3">Three Columns</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=3&amp;opt=wide">Three Columns Wide</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=4">Four Columns</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=4&amp;opt=wide">Four Columns Wide</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=5&amp;opt=wide">Five Columns Wide</a></li>
              <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?column=6&amp;opt=wide">Six Columns Wide</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?filter_cat=63">Women</a></li>
      <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?filter_cat=42">Men</a></li>
      <li className="o-menu_item"><a href="https://klbtheme.com/clotya/shop/?filter_cat=44">Outerwear</a></li>
      <li className="o-menu_item"><a href="https://klbtheme.com/clotya/blog/">Blog</a></li>
      <li className="o-menu_item"><a href="https://klbtheme.com/clotya/contact/">Contact</a></li>
    </ul>
  </div>
);

Menu.defaultProps = {
  children: undefined,
};

export default Menu;
