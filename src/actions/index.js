import DummyTodoService from "../services/dummy-todo-service";
import {actions, initialState} from "../reducers";

const service = new DummyTodoService();
service.changeFilter(initialState.filter);
service.changeSearch(initialState.search);

const callAction = (action, params, dispatch) => {
  dispatch(actions.setLoading(true));

  service[action](params)
    .then(data => {
      dispatch(actions.setLoading(false));
      dispatch(actions.setError(""));
      if(data.items !== undefined) {
        dispatch(actions.setItems(data.items));
      }
      if(data.doneCount !== undefined) {
        dispatch(actions.setDoneCount(data.doneCount));
      }
      if(data.importantCount !== undefined) {
        dispatch(actions.setImportantCount(data.importantCount));
      }
      if(data.allCount !== undefined) {
        dispatch(actions.setAllCount(data.allCount));
      }
    })
    .catch(err => {
      dispatch(actions.setLoading(false));
      dispatch(actions.setError(err.error));
    });
};

export const getList = () => dispatch => callAction('getList', {}, dispatch);

export const addItem = item => dispatch => callAction('addItem', {item: item}, dispatch);

export const deleteItem = id => dispatch => callAction('deleteItem', id, dispatch);

export const toggleImportant = id => dispatch => callAction('toggleImportant', id, dispatch);

export const toggleDone = id => dispatch => callAction('toggleDone', id, dispatch);

export const setSearch = search => dispatch => {
  dispatch(actions.setSearch(search));
  callAction('setSearch', search, dispatch)
};

export const setFilter = filter => dispatch => {
  dispatch(actions.setFilter(filter));
  callAction('setFilter', filter, dispatch);
};