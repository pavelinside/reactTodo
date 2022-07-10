const updateSearch = (state, action) => {
  if (state === undefined) {
    return "";
  }
  switch (action.type) {
  case "SET_SEARCH":
    return action.payload;
  default:
    return state.search;
  }
};
export default updateSearch;