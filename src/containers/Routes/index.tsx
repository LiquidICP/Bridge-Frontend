import React from 'react';
import { Route, Routes as RoutesDom } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { Layout } from 'components';

export const Routes = () => (
  <RoutesDom>
    <Route
      path="/"
      element={<Layout />}
    >
      <Route
        path="/"
        element={<HomePage />}
      />
    </Route>
  </RoutesDom>
);
