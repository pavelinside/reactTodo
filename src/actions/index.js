const addItem = function (item) {
  return {
    type: "ADD_ITEM",
    payload: item
  }
};
const deleteItem = function (item) {
  return {
    type: "DELETE_ITEM",
    payload: item
  }
};
const toggleDoneItem = function (item) {
  return {
    type: "TOGGLE_DONE_ITEM",
    payload: item
  }
};
const toggleImportantItem = function (item) {
  return {
    type: "TOGGLE_IMPORTANT_ITEM",
    payload: item
  }
};
const setFilter = function (item) {
  return {
    type: "SET_FILTER",
    payload: item
  }
};
const setSearch = function (item) {
  return {
    type: "SET_SEARCH",
    payload: item
  }
};
module.exports = {addItem, deleteItem, toggleDoneItem, toggleImportantItem, setFilter, setSearch};