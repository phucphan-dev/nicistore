/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import React, { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import {
  BrowserRouter, useRoutes
} from 'react-router-dom';

import banner from 'assets/images/banner.jpg';
import routes from 'routes';
import { store } from 'store';

const App: React.FC = () => {
  const element = useRoutes(routes);
  return (
    <Suspense fallback={null}>
      <Helmet>
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
          name="og:description"
          property="og:description"
          content="Quần áo nam nữ, phụ kiện thời trang. Chuyên order giá rẻ"
        />
        <meta
          name="og:image"
          property="og:image"
          content={banner}
        />
      </Helmet>
      {element}
    </Suspense>
  );
};

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
