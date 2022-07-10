import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';

// init Redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import reducer from "./reducers";
const store = configureStore({
  reducer: reducer
})

const rootNode = document.getElementById("root");
const root = createRoot(rootNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);