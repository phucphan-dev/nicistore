/* eslint-disable react/react-in-jsx-scope */
import { RouteObject } from 'react-router-dom';

import MainLayout from 'components/templates/MainLayout';
import Account from 'pages/Account';
import Authenticate from 'pages/Authenticate';
import Cart from 'pages/Cart';
import Checkout from 'pages/Checkout';
import Contact from 'pages/Contact';
import Home from 'pages/Home';
import ProductDetail from 'pages/ProductDetail';
import Products from 'pages/Products';
import TrackingOrder from 'pages/TrackingOrder';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/authenticate', element: <Authenticate /> },
      { path: '/:category', element: <Products /> },
      { path: '/san-pham/:product', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/tracking-order', element: <TrackingOrder /> },
      { path: '/account', element: <Account /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
];

export default routes;
