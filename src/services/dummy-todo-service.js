import {filterItems, searchItems, deleteItem, createItem, toggleDone, toggleImportant} from "./dummy-todo-function";
import initialState from "../reducers/initial-state";

export default class DummyTodoService {
  state = {
    items: [
      { id: 1, label: "Drink Tea", important: false, done: false },
      { id: 2, label: "Learn React", important: true, done: false },
      { id: 3, label: "Make Awesome App", important: false, done: false }
    ],
    filter: initialState.filter,
    search: initialState.search,
    doneCount: initialState.doneCount,
    importantCount: initialState.importantCount,
    allCount: initialState.allCount,
    error: ""
  };

  formResult() {
    const items = searchItems(
      filterItems(this.state.items, this.state.filter),
      this.state.search
    );

    return {
      items,
      doneCount: this.state.doneCount,
      importantCount: this.state.importantCount,
      allCount: this.state.allCount
    };
  }

  _transformItems = () => {
    this.state.doneCount = this.state.items.filter((item) => item.done).length;
    this.state.importantCount = this.state.items.filter((item) => item.important).length;
    this.state.allCount = this.state.items.length;
  };

  async getList({action = "load"} = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.75) {
          //resolve(this.formResult());
          reject( {error: `Error ${action}`});
        } else {
          this._transformItems();
          resolve(this.formResult());
        }
      }, 1000);
    });
  }

  async setSearch(value) {
    this.state.search = value;
    return this.getList({action: 'search'});
  }

  async setFilter(value){
    this.state.filter = value;
    return this.getList({action: 'filter'});
  }

  async addItem({item = ""}) {
    if(!item){
      return Promise.reject("Incorrect title");
    }
    this.state.items = createItem(this.state.items, item);
    return this.getList({action: 'add'});
  }

  async deleteItem(id = 0) {
    if(id <= 0){
      return Promise.reject("Incorrect id");
    }
    this.state.items = deleteItem(this.state.items, id);
    return this.getList({action: 'delete'});
  }

  async toggleDone(id = 0) {
    if(id <= 0){
      return Promise.reject("Incorrect id");
    }
    this.state.items = toggleDone(this.state.items, id);
    return this.getList({action: 'change done state'});
  }

  async toggleImportant(id = 0) {
    if(id <= 0){
      return Promise.reject("Incorrect id");
    }
    this.state.items = toggleImportant(this.state.items, id);
    return this.getList({action: 'change important state'});
  }
}