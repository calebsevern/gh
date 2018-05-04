import React from 'react';
import ReactDOM from 'react-dom';
import GitHubBrowserContainer from './components/browser/GitHubBrowserContainer.js';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers.js';

const middleware = [thunk];
const store = createStore(
  reducers,
  applyMiddleware(...middleware),
);

const wrapperEl = document.getElementById('github-browser-wrapper');
ReactDOM.render((
  <Provider store={store}>
    <GitHubBrowserContainer />
  </Provider>
), wrapperEl);
