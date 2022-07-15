import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';

// Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // async

import reducer from "./reducers";
const store = configureStore({
  reducer,
  middleware: [ thunk ]
});
// store.dispatch(setDoneCount(0))

const rootNode = document.getElementById("root");
const root = createRoot(rootNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);