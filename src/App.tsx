import './App.scss';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import MainLayout from 'components/templates/MainLayout';
import Home from 'pages/Home';
import Products from 'pages/Products';

const App: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
