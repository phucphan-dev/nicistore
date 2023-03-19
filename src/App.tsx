import './App.scss';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import MainLayout from 'components/templates/MainLayout';
import Account from 'pages/Account';
import Authenticate from 'pages/Authenticate';
import Cart from 'pages/Cart';
import Checkout from 'pages/Checkout';
import Contact from 'pages/Contact';
import Home from 'pages/Home';
import ProductDetail from 'pages/ProductDetail';
import Products from 'pages/Products';
import { store } from 'store';

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/authenticate" element={<Authenticate />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<Account />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
