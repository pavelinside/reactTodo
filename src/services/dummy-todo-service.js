import {filterItems, searchItems, deleteItem, createItem, toggleDone, toggleImportant} from "./dummy-todo-function";
import initialState from "../reducers/initial-state";

export default class DummyTodoService {
  state = {
    items: [
      { id: 1, label: "Drink Tea", important: false, done: false },
      { id: 2, label: "Learn React", important: true, done: false },
      { id: 3, label: "Make Awesome App", important: false, done: false },
      { id: 11, label: "11", important: false, done: false },
      { id: 12, label: "12", important: true, done: false },
      { id: 13, label: "13", important: false, done: true },
      { id: 14, label: "14", important: false, done: false },
      { id: 15, label: "15", important: true, done: false },
      { id: 16, label: "16", important: false, done: false },
      { id: 17, label: "17", important: false, done: false },
      { id: 18, label: "18", important: true, done: false },
      { id: 19, label: "19", important: false, done: false },
      { id: 20, label: "20", important: false, done: false },
      { id: 21, label: "21", important: false, done: false },
      { id: 22, label: "22", important: true, done: false },
      { id: 23, label: "23", important: false, done: true },
      { id: 24, label: "24", important: false, done: false },
      { id: 25, label: "25", important: true, done: false },
      { id: 26, label: "26", important: false, done: false },
      { id: 27, label: "27", important: false, done: false },
      { id: 28, label: "28", important: true, done: false },
      { id: 29, label: "29", important: false, done: false },
      { id: 30, label: "30", important: false, done: false },
      { id: 31, label: "31", important: false, done: false },
      { id: 32, label: "32", important: true, done: false },
      { id: 33, label: "33", important: false, done: true },
      { id: 34, label: "34", important: false, done: false },
      { id: 35, label: "35", important: true, done: false },
      { id: 36, label: "36", important: false, done: false },
      { id: 37, label: "37", important: false, done: false },
      { id: 38, label: "38", important: true, done: false },
      { id: 39, label: "39", important: false, done: false },
      { id: 40, label: "40", important: false, done: false },
      { id: 41, label: "41", important: false, done: false },
      { id: 42, label: "42", important: true, done: false },
      { id: 43, label: "43", important: false, done: true },
      { id: 44, label: "44", important: false, done: false },
      { id: 45, label: "45", important: true, done: false },
      { id: 46, label: "46", important: false, done: false },
      { id: 47, label: "47", important: false, done: false },
      { id: 48, label: "48", important: true, done: false },
      { id: 49, label: "49", important: false, done: false },
      { id: 50, label: "50", important: false, done: false },
      { id: 51, label: "51", important: false, done: false },
      { id: 52, label: "52", important: true, done: false },
      { id: 53, label: "53", important: false, done: true },
      { id: 54, label: "54", important: false, done: false },
      { id: 55, label: "55", important: true, done: false },
      { id: 56, label: "56", important: false, done: false },
      { id: 57, label: "57", important: false, done: false },
      { id: 58, label: "58", important: true, done: false },
      { id: 59, label: "59", important: false, done: false },
      { id: 60, label: "60", important: false, done: false },
      { id: 61, label: "61", important: false, done: false },
      { id: 62, label: "62", important: true, done: false },
      { id: 63, label: "63", important: false, done: true },
      { id: 64, label: "64", important: false, done: false },
      { id: 65, label: "65", important: true, done: false },
      { id: 66, label: "66", important: false, done: false },
      { id: 67, label: "67", important: false, done: false },
      { id: 68, label: "68", important: true, done: false },
      { id: 69, label: "69", important: false, done: false },
      { id: 70, label: "70", important: false, done: false },
    ],
    filter: initialState.filter,
    search: initialState.search,
    pageNumber: initialState.pageNumber,
    pageLimit: initialState.pageLimit,
    error: ""
  };

  formResult() {
    let items = searchItems(
      filterItems(this.state.items, this.state.filter),
      this.state.search
    );

    const doneCount = items.filter((item) => item.done).length;
    const importantCount = items.filter((item) => item.important).length;
    const allCount = items.length;
    const pagesTotal = Math.ceil(items.length / this.state.pageLimit);
    if(this.state.pageNumber > pagesTotal){
      this.state.pageNumber = pagesTotal;
    }

    const offset = (this.state.pageNumber - 1) * this.state.pageLimit;
    items = items.slice(offset, offset + this.state.pageLimit);

    return {
      items,
      doneCount,
      importantCount,
      allCount,
      pageNumber: this.state.pageNumber,
      pagesTotal
    };
  }

  async getList({action = "load"} = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //if (Math.random() > 0.75) {
        if (Math.random() > 1) {
          reject( {error: `Error ${action}`});
        } else {
          resolve(this.formResult());
        }
      }, 1000);
    });
  }

  async setSearch(value) {
    this.state.pageNumber = 1;
    this.state.search = value;
    return this.getList({action: 'search'});
  }

  async setFilter(value){
    this.state.pageNumber = 1;
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

  async setPageNumber(pageNumber = 1) {
    if(pageNumber <= 0){
      return Promise.reject("Incorrect pageNumber");
    }
    this.state.pageNumber = pageNumber;
    return this.getList({action: 'change pageNumber'});
  }
}