//import Service from "../services/dummy-todo-service";
import Service from "../services/node-todo-service";
import {actions} from "../reducers";

const service = new Service();

const callAction = async (action, params, dispatch) => {
  dispatch(actions.setLoading(true));

  const data = await service[action](params).catch((err) => {
    //console.log('error', err);
    dispatch(actions.setLoading(false));
    dispatch(actions.setError(err.error));
  });
  if(!data){
    return;
  }

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
  if(data.pageNumber !== undefined) {
    dispatch(actions.setPageNumber(data.pageNumber));
  }
  if(data.pagesTotal !== undefined) {
    dispatch(actions.setPagesTotal(data.pagesTotal));
  }
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

export const onPageChanged = paginationData => dispatch => {
  //console.log('onPageChanged', paginationData);
  dispatch(actions.setPageNumber(paginationData.pageNumber));
  callAction('setPageNumber', paginationData.pageNumber, dispatch);
};