/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import React, { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom';

import MainLayout from 'components/templates/MainLayout';
import Home from 'pages/Home';
import { store } from 'store';
import { ROUTES_PATH } from 'utils/constants';

const Account = React.lazy(() => import('pages/Account'));
const Authenticate = React.lazy(() => import('pages/Authenticate'));
const Cart = React.lazy(() => import('pages/Cart'));
const Checkout = React.lazy(() => import('pages/Checkout'));
const Contact = React.lazy(() => import('pages/Contact'));
const ProductDetail = React.lazy(() => import('pages/ProductDetail'));
const Products = React.lazy(() => import('pages/Products'));
const TrackingOrder = React.lazy(() => import('pages/TrackingOrder'));
const Wishlist = React.lazy(() => import('pages/Wishlist'));

const App: React.FC = () => (
  <Suspense fallback={null}>
    {/* <Helmet>
      <meta
        name="description"
        content="Quần áo nam nữ, phụ kiện thời trang. Chuyên order giá rẻ"
      />
      <meta name="keyword" content="Thời trang, Nữ, Phụ kiện, Order, Giá rẻ" />
      <meta name="og:url" property="og:url" content={window.location.href} />
      <meta
        name="og:title"
        property="og:title"
        content="Nici Store"
      />
      <meta
        name="og:type"
        property="og:type"
        content="fashion"
      />
      <meta
        name="og:description"
        property="og:description"
        content="Quần áo nam nữ, phụ kiện thời trang. Chuyên order giá rẻ"
      />
      <meta
        name="og:image"
        property="og:image"
        content={`${window.location.origin}/logo.svg`}
      />
    </Helmet> */}
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES_PATH.AUTHENTICATE} element={<Authenticate />} />
        <Route path="/:category" element={<Products />} />
        <Route path={`${ROUTES_PATH.PRODUCT_DETAIL}/:product`} element={<ProductDetail />} />
        <Route path={ROUTES_PATH.CART} element={<Cart />} />
        <Route path={ROUTES_PATH.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES_PATH.TRACKING_ORDER} element={<TrackingOrder />} />
        <Route path={ROUTES_PATH.ACCOUNT} element={<Account />} />
        <Route path={ROUTES_PATH.CONTACT} element={<Contact />} />
        <Route path={ROUTES_PATH.WISHLIST} element={<Wishlist />} />
      </Route>
    </Routes>
  </Suspense>
);

const AppMain: React.FC = () => {
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
        <HelmetProvider context={{}}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default AppMain;
