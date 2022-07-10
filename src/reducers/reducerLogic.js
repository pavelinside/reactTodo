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

let maxId = 100;
const createItem = function(label){
  return {
    id: ++maxId,
    label,
    important: false,
    done: false
  };
};
//createItem.maxId = 100;

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


export {deleteItem, createItem, toggleProperty, toggleDone, toggleImportant};
