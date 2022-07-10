const updateFilter = (state, action) => {
  if (state === undefined) {
    return "all";
  }
  switch (action.type) {
  case "SET_FILTER":
    return action.payload;
  default:
    return state.filter;
  }
};
export default updateFilter;