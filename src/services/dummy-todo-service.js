import {filterItems, searchItems, deleteItem, createItem, toggleDone, toggleImportant} from "./dummy-todo-function";

export default class DummyTodoService {
  state = {
    items: [
      { id: 1, label: "Drink Tea", important: false, done: false },
      { id: 2, label: "Learn React", important: true, done: false },
      { id: 3, label: "Make Awesome App", important: false, done: false }
    ],
    filter: "all",
    search: "",
    error: "",
    message: ""
  }

  changeSearch(value){
    this.state.search = value;
  }

  changeFilter(value){
    this.state.filter = value;
  }

  formResult() {
    const doneCount = this.state.items.filter((item) => item.done).length;
    const importantCount = this.state.items.filter((item) => item.important).length;
    const allCount = this.state.items.length;
    const items = searchItems(
      filterItems(this.state.items, this.state.filter),
      this.state.search
    );

    return {
      items,
      doneCount,
      importantCount,
      allCount
    };
  }

  getList({action = "load"} = {}) {
    this.state.message = "";
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          //resolve(this.formResult());
          reject( {error: `Error ${action}`});
        } else {
          resolve(this.formResult());
        }
      }, 1000);
    });
  }

  setSearch(value) {
    this.changeSearch(value);
    return this.getList({action: 'search'});
  }

  setFilter(value){
    this.changeFilter(value);
    return this.getList({action: 'filter'});
  }

  addItem({item = ""}) {
    if(!item){
      return Promise.reject("Incorrect title");
    }
    const newItem = createItem(item);
    //this.state.items.push(newItem); // TypeError: Cannot add property 3, object is not extensible
    this.state.items = [...this.state.items, newItem];
    return this.getList({action: 'add'});
  }

  deleteItem(id = 0) {
    if(id <= 0){
      return Promise.reject("Incorrect id");
    }
    this.state.items = deleteItem(this.state.items, id);
    return this.getList({action: 'delete'});
  }

  toggleDone(id = 0) {
    if(id <= 0){
      return Promise.reject("Incorrect id");
    }
    this.state.items = toggleDone(this.state.items, id);
    return this.getList({action: 'change done state'});
  }

  toggleImportant(id = 0) {
    if(id <= 0){
      return Promise.reject("Incorrect id");
    }
    this.state.items = toggleImportant(this.state.items, id);
    return this.getList({action: 'change important state'});
  }
}