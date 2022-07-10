import { createSlice } from '@reduxjs/toolkit';

let maxId = 100;

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [
      { id: 1, label: "Drink Coffee", important: false, done: false },
      { id: 2, label: "Learn React", important: true, done: false },
      { id: 3, label: "Make Awesome App", important: false, done: false }
    ],
    filter: "important",
    search: ""
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const newItem = createItem(action.payload);
      state.items = [...state.items, newItem];
    },
    deleteItem: (state, action) => {
      state.items = deleteItem(state.items, action.payload);
    },
    toggleDoneItem: (state, action) => {
      state.items = toggleDone(state.items, action.payload);
    },
    toggleImportantItem: (state, action) => {
      state.items = toggleImportant(state.items, action.payload);
    },
    setFilter: (state, action) => {
      console.log('setFilter', action);
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    }
  }
});

/*
store.dispatch(setItems([
  { id: 4, label: "Drink Coffee2", important: false, done: false },
  { id: 5, label: "Learn React2", important: true, done: false },
  { id: 6, label: "Make Awesome App2", important: false, done: false }
]))
store.dispatch(addItem('Hello Redux 7'))
store.dispatch(deleteItem(1))
store.dispatch(toggleDoneItem(1))
store.dispatch(toggleImportantItem(1))
store.dispatch(setFilter('important'))
store.dispatch(setSearch('ri'))
 */

const deleteItem = function(items, id){
  const idx = items.findIndex((item) => item.id === id);
  if(idx === -1){
    return [...items];
  }
  return [
    ...items.slice(0, idx),
    ...items.slice(idx + 1)
  ];
};

const createItem = function(label){
  return {
    id: ++maxId,
    label,
    important: false,
    done: false
  };
};

const toggleProperty = function(arr, id, propName) {
  const idx = arr.findIndex((item) => item.id === id);
  if(idx === -1){
    return [...arr];
  }
  const oldItem = arr[idx];
  const value = !oldItem[propName];
  const item = { ...arr[idx], [propName]: value };
  return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
};
const toggleDone = function(items, id){
  return toggleProperty(items, id, "done");
};
const toggleImportant = function(items, id){
  return toggleProperty(items, id, "important");
};

const { actions} = todoSlice;
export {actions};
export default todoSlice;
