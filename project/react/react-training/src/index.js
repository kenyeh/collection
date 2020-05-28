import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-less/semantic.less';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import App from './App';

import './lang';


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
