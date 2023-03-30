/* eslint-disable react/react-in-jsx-scope */
import Account from 'pages/Account';
import Authenticate from 'pages/Authenticate';
import Cart from 'pages/Cart';
import Checkout from 'pages/Checkout';
import Contact from 'pages/Contact';
import Home from 'pages/Home';
import ProductDetail from 'pages/ProductDetail';
import Products from 'pages/Products';
import TrackingOrder from 'pages/TrackingOrder';

const routes = [
  {
    key: 'home',
    path: '/',
    element: <Home />
  },
  {
    key: 'authenticate',
    path: '/authenticate',
    element: <Authenticate />
  },
  {
    key: 'product-categories',
    path: ':category',
    element: <Products />
  },
  {
    key: 'product-detail',
    path: ':category/:product',
    element: <ProductDetail />
  },
  {
    key: 'cart',
    path: '/cart',
    element: <Cart />
  },
  {
    key: 'checkout',
    path: '/checkout',
    element: <Checkout />
  },
  {
    key: 'trackingOrder',
    path: '/tracking-order',
    element: <TrackingOrder />
  },
  {
    key: 'account',
    path: '/account',
    element: <Account />
  },
  {
    key: 'contact',
    path: '/contact',
    element: <Contact />
  },
];

export default routes;
