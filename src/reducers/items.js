let maxId = 100;

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

const updateItems = (state, action) => {
  if (state === undefined) {
    return [];
  }
  console.log('SS', state, action);

  let newItems = [];

  switch (action.type) {
  case "SET_ITEMS":
    newItems = (state && state.items || []).concat(action.state.items);
    return newItems;

  case "ADD_ITEM":
    return [...state.items, createItem(action.payload)];

  case "DELETE_ITEM":
    //debugger;
    newItems = deleteItem(state.items, action.payload);
    return newItems;

  case "TOGGLE_DONE_ITEM":
    newItems = toggleDone(state.items, action.payload);
    return newItems;

  case "TOGGLE_IMPORTANT_ITEM":
    newItems = toggleImportant(state.items, action.payload);
    return newItems;

  default:
    return state.items;
  }
};
export default updateItems;