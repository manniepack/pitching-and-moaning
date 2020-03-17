import 'sanitize.css';
import 'mobx-react-lite/optimizeForReactDom'

import isDev from '~scripts/utils/isDev';
import * as log from 'loglevel';

import React from 'react';
import ReactDOM from 'react-dom';

import { AppStateProvider } from '~scripts/models/appState';
import Animation from '~scripts/components/Animation';

log.setLevel(isDev ? log.levels.TRACE : log.levels.INFO);

ReactDOM.render(
  <AppStateProvider>
    <Animation />
  </AppStateProvider>,
  document.getElementById('root'),
);
