import updateItems from "./items";
import updateFilter from "./filter";
import updateSearch from "./search";

const reducer = (state, action) => {
  return {
    items: updateItems(state, action),
    filter: updateFilter(state, action),
    search: updateSearch(state, action)
  };
};

export default reducer;