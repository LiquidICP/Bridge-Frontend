import React from 'react';
import { Route, Routes as RoutesDom } from 'react-router-dom';
import { Layout } from 'components';

export const Routes = () => (
  <RoutesDom>
    <Route
      path="/"
      element={<Layout />}
    >
      <Route path="/" element={<h1>Hello world!</h1>} />
    </Route>
  </RoutesDom>
);
