/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import {
  BrowserRouter, useRoutes
} from 'react-router-dom';

import routes from 'routes';
import { store } from 'store';

const App: React.FC = () => {
  const element = useRoutes(routes);
  return (
    <Suspense fallback={null}>
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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default AppMain;
