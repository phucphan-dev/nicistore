import React from 'react';
import { Outlet } from 'react-router-dom';

import Subscribe from '../Subscribe';

import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import Section from 'components/organisms/Section';

const MainLayout: React.FC = () => (
  <main>
    <Header />
    <Outlet />
    <Section>
      <Subscribe />
    </Section>
    <Footer />
  </main>
);

export default MainLayout;
