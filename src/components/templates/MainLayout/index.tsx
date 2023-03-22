import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Subscribe from '../Subscribe';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Loading from 'components/atoms/Loading';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import Section from 'components/organisms/Section';
import useInitialRender from 'hooks/useInitialRender';
import useWindowDimensions from 'hooks/useWindowDemensions';
import mapModifiers from 'utils/functions';

const MainLayout: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const [openSearch, setOpenSearch] = useState(false);
  const loading = useInitialRender();
  useEffect(() => {
    if (openSearch) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'unset';
    }
  }, [openSearch]);
  return (
    <main id="main">
      {loading && <Loading isShow variant="fullScreen" isFill />}
      <Header handleSearch={() => setOpenSearch(true)} />
      <Outlet />
      <Section>
        <Subscribe />
      </Section>
      <Footer />
      <div
        className={mapModifiers('search-panel', openSearch && 'opened')}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Container>
          <div className="search-panel_head">
            <Typography.Text modifiers={['16x18']}>What are you looking for?</Typography.Text>
            <Button iconName="close" iconSize="20" handleClick={() => setOpenSearch(false)} />
          </div>
          <div className="search-panel_input">
            <Input placeholder="Search your favorite product" search />
          </div>
          <Typography.Text modifiers={['14x16', 'ashGrey']}>
            Please type the word you want to search and press &quot;enter&quot;
          </Typography.Text>
        </Container>
      </div>
      <ToastContainer autoClose={1000} style={{ fontSize: '12px' }} />
    </main>
  );
};

export default MainLayout;
