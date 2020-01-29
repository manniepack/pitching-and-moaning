import React from 'react';
// import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from 'global-styles';

export default function App() {
  return (
    <div>
      <HomePage />
      <GlobalStyle />
    </div>
  );
}
