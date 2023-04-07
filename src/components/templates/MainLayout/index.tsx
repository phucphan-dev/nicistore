import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Subscribe from '../Subscribe';

import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import { LoadingMain } from 'components/atoms/Loading';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import Section from 'components/organisms/Section';
import useInitialRender from 'hooks/useInitialRender';
import useWindowDimensions from 'hooks/useWindowDemensions';
import { useAppSelector } from 'store/hooks';
import mapModifiers, { groupMenusFromCategories } from 'utils/functions';

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { width, height } = useWindowDimensions();
  const categories = useAppSelector((state) => state.product.categories);
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const loading = useInitialRender();
  useEffect(() => {
    if (openSearch || loading) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'unset';
    }
  }, [openSearch, loading]);

  const menus = useMemo(() => [
    ...groupMenusFromCategories(categories), {
      id: 'contact',
      text: 'Liên hệ',
      link: 'contact',
    }], [categories]);

  return (
    <main id="main">
      <LoadingMain closed={!loading} />
      <Header
        open={openMenu}
        menus={menus}
        handleToggleMenu={() => setOpenMenu(!openMenu)}
        handleSearch={() => setOpenSearch(true)}
      />
      <div className="main-content">
        <Outlet />
      </div>
      <Section noSpace>
        <Subscribe />
      </Section>
      <Footer />
      <div
        className={mapModifiers('search-panel', openSearch && 'opened')}
        style={{ width: `${width}px`, height: `${openSearch ? height : 0}px` }}
      >
        <Container>
          <div className="search-panel_head">
            <Typography.Text modifiers={['16x18']}>Bạn đang tìm kiếm sản phẩm nào?</Typography.Text>
            <Button iconName="close" iconSize="20" handleClick={() => setOpenSearch(false)} />
          </div>
          <div className="search-panel_input">
            <Input placeholder="Tìm kiếm sản phẩm của bạn" search />
          </div>
          <Typography.Text modifiers={['14x16', 'ashGrey']}>
            Vui lòng nhập từ khoá bạn muốn tìm và nhấn &quot;enter&quot;
          </Typography.Text>
        </Container>
      </div>
      <div className="footer-menu">
        {pathname === '/' ? (
          <Link href="/tat-cas" customClassName="footer-menu_item">
            <Icon iconName="shop" size="24" />
            <Typography.Text modifiers={['12x14', '500']}>Cửa hàng</Typography.Text>
          </Link>
        ) : (
          <Link href="/" customClassName="footer-menu_item">
            <Icon iconName="home" size="24" />
            <Typography.Text modifiers={['12x14', '500']}>Trang chủ</Typography.Text>
          </Link>
        )}
        <div className="footer-menu_item" onClick={() => setOpenMenu(!openMenu)}>
          <Icon iconName="menu" size="24" />
          <Typography.Text modifiers={['12x14', '500']}>Danh mục</Typography.Text>
        </div>
        <div className="footer-menu_item" onClick={() => setOpenSearch(true)}>
          <Icon iconName="search" size="24" />
          <Typography.Text modifiers={['12x14', '500']}>Tìm kiếm</Typography.Text>
        </div>
        {/* <Link href="/wishlist" customClassName="footer-menu_item">
          <Icon iconName="love" size="24" />
          <Typography.Text modifiers={['12x14', '500']}>Yêu thích</Typography.Text>
        </Link> */}
        <Link href="/account" customClassName="footer-menu_item">
          <Icon iconName="user" size="24" />
          <Typography.Text modifiers={['12x14', '500']}>Tài khoản</Typography.Text>
        </Link>
      </div>
      <ToastContainer autoClose={300} style={{ fontSize: '12px' }} />
    </main>
  );
};

export default MainLayout;
