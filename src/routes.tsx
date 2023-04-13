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
import Wishlist from 'pages/Wishlist';
import { ROUTES_PATH } from 'utils/constants';

const routes: RouteObject[] = [
  {
    path: ROUTES_PATH.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES_PATH.AUTHENTICATE, element: <Authenticate /> },
      { path: '/:category', element: <Products /> },
      { path: `${ROUTES_PATH.PRODUCT_DETAIL}/:product`, element: <ProductDetail /> },
      { path: ROUTES_PATH.CART, element: <Cart /> },
      { path: ROUTES_PATH.CHECKOUT, element: <Checkout /> },
      { path: ROUTES_PATH.TRACKING_ORDER, element: <TrackingOrder /> },
      { path: ROUTES_PATH.ACCOUNT, element: <Account /> },
      { path: ROUTES_PATH.CONTACT, element: <Contact /> },
      { path: ROUTES_PATH.WISHLIST, element: <Wishlist /> },
    ],
  },
];

export default routes;
