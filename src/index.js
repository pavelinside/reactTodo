import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
//import AppView from './components/appview';



import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit'
import todoSlice from "./reducers/todoSlice";
//export const { setItems, addItem, deleteItem, toggleDoneItem, toggleImportantItem, setFilter, setSearch } = todoSlice.actions
const store = configureStore({
  reducer: todoSlice.reducer
})

// import reducer from "./reducers";
// import { createStore } from 'redux';
// let store = createStore(reducer);
// store.dispatch({
//   type: "SET_ITEMS",
//   state: {
//     items: [
//       { id: 1, label: "Drink Coffee", important: false, done: false },
//       { id: 2, label: "Learn React", important: true, done: false },
//       { id: 3, label: "Make Awesome App", important: false, done: false }
//     ],
//     filter: "all",
//     search: ""
//   }
// });

const rootNode = document.getElementById("root");    // элемент для рендеринга приложения React
const root = createRoot(rootNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);