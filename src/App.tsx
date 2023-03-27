/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import {
  BrowserRouter, HashRouter, Route, Routes
} from 'react-router-dom';

import MainLayout from 'components/templates/MainLayout';
import routes from 'routes';
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
              {routes.map((route) => <Route {...route} />)}
            </Route>
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
