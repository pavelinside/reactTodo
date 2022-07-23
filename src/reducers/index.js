import { createSlice } from '@reduxjs/toolkit';
import initialState from './initial-state';

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
      console.log('setLoading', action.payload);
      state.loading = action.payload;
    },
    setItems: (state, action) => {
      console.log('setItems', action.payload);
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      console.log('setFilter', action.payload);
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      console.log('setSearch', action.payload);
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
      console.log('setAllCount', action.payload);
      state.allCount = action.payload;
    },
    setPageNumber: (state, action) => {
      console.log('setPageNumber', action.payload);
      state.pageNumber = action.payload;
    },
    setPagesTotal: (state, action) => {
      console.log('setPagesTotal', action.payload);
      state.pagesTotal = action.payload;
    }
  }
});

const {actions} = todoSlice;
export {actions};
export default todoSlice.reducer;