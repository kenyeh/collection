import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import hack from "./utils/hack";
import registerServiceWorker from './registerServiceWorker';
import reducers from "./reducers";

import './index.css';
import App from './App';

/**
 * 中间件
 * thunk：解决异步 dispatch 和 混合 dispatch 操作
 */
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

hack();
registerServiceWorker();
