import { createSlice } from '@reduxjs/toolkit';
import DummyTodoService from "../services/dummy-todo-service";

const initialState = {
  items: [
    { id: 1, label: "Drink Tea", important: false, done: false }
  ],
  filter: "all",
  search: "",
  loading: false,
  error: "",
  doneCount: 0,
  importantCount: 0,
  allCount: 0
};

// https://stackoverflow.com/questions/61834206/how-to-use-dispatch-in-createslice-reducer
const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    setError: (state, action) => {
      console.log('setError', action.payload);
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      //console.log('setLoading', action.payload);
      state.loading = action.payload;
    },
    setItems: (state, action) => {
      //console.log('setItems', action.payload);
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      //console.log('setFilter', action.payload);
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      //console.log('setSearch', action.payload);
      state.search = action.payload;
    },
    setDoneCount: (state, action) => {
      //console.log('setDoneCount', action.payload);
      state.doneCount = action.payload;
    },
    setImportantCount: (state, action) => {
      //console.log('setImportantCount', action.payload);
      state.importantCount = action.payload;
    },
    setAllCount: (state, action) => {
      // console.log('setAllCount', action.payload);
      state.allCount = action.payload;
    }
  }
});

const service = new DummyTodoService();
service.changeFilter(initialState.filter);
service.changeSearch(initialState.search);

const callAction = (action, params, dispatch) => {
  dispatch(todoSlice.actions.setLoading(true));

  service[action](params)
    .then(data => {
      dispatch(todoSlice.actions.setLoading(false));
      dispatch(todoSlice.actions.setError(""));
      if(data.items !== undefined) {
        dispatch(todoSlice.actions.setItems(data.items));
      }
      if(data.doneCount !== undefined) {
        dispatch(todoSlice.actions.setDoneCount(data.doneCount));
      }
      if(data.importantCount !== undefined) {
        dispatch(todoSlice.actions.setImportantCount(data.importantCount));
      }
      if(data.allCount !== undefined) {
        dispatch(todoSlice.actions.setAllCount(data.allCount));
      }
    })
    .catch(err => {
      console.log('Error', err);
      dispatch(todoSlice.actions.setLoading(false));
      dispatch(todoSlice.actions.setError(err.error));
    });
};

export const getList = () => dispatch => callAction('getList', {}, dispatch);

export const addItem = item => dispatch => callAction('addItem', {item: item}, dispatch);

export const deleteItem = id => dispatch => callAction('deleteItem', id, dispatch);

export const toggleImportant = id => dispatch => callAction('toggleImportant', id, dispatch);

export const toggleDone = id => dispatch => callAction('toggleDone', id, dispatch);

export const setSearch = search => dispatch => {
  dispatch(todoSlice.actions.setSearch(search));
  callAction('setSearch', search, dispatch)
};

export const setFilter = filter => dispatch => {
  dispatch(todoSlice.actions.setFilter(filter));
  callAction('setFilter', filter, dispatch);
};

//const { actions, reducer} = todoSlice;
export default todoSlice.reducer;