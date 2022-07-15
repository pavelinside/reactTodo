let maxId = 100;
const createItem = function(label){
  return {
    id: ++maxId,
    label,
    important: false,
    done: false
  };
};

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

const filterItems = function(items, filter){
  if (filter === "all") {
    return items;
  } else if (filter === "active") {
    return items.filter((item) => !item.done);
  } else if (filter === "done") {
    return items.filter((item) => item.done);
  } else if (filter === "important") {
    return items.filter((item) => item.important);
  }
};

const searchItemPos = (label, search) => label.toLowerCase().indexOf((search || "").toLowerCase());

const searchItems = function(items, search){
  if (search.length === 0) {
    return items;
  }
  return items.filter((item) => {
    return searchItemPos(item.label, search) > -1;
  });
};

export {filterItems, searchItems};
export {deleteItem, createItem, toggleProperty, toggleDone, toggleImportant};