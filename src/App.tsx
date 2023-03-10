import './App.scss';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from 'components/templates/MainLayout';
import Home from 'pages/Home';
import Products from 'pages/Products';

const App: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
