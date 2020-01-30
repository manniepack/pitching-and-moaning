/**
  * Welcome to Pitching and Moaning!
  *
  * This React application is a promotional
  * webpage for Eavesdrop Media's new tele-
  * vision series: Pitching and Moaning
  *
  * Check it out at www.pitchingandmoaning.com
  */

import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV)
  switch(process.env.NODE_ENV) {
    case 'development':
      serviceWorker.unregister();
      break;
    default:
      serviceWorker.register();
  }
