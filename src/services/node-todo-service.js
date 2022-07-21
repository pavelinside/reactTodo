import initialState from "../reducers/initial-state";
import {makeRequest, apiBase} from "./node-request";

export default class NodeTodoService {
  state = {
    items: [],
    filter: initialState.filter,
    search: initialState.search,
    doneCount: initialState.doneCount,
    importantCount: initialState.importantCount,
    allCount: initialState.allCount,
    error: ""
  };

  formResult() {
    return {
      items: this.state.items,
      doneCount: this.state.doneCount,
      importantCount: this.state.importantCount,
      allCount: this.state.allCount
    };
  }

  _transformItems = (data) => {
    if(!data){
      return;
    }
    if(data.allCount !== undefined){
      this.state.allCount = data.allCount;
    }
    if(data.importantCount !== undefined){
      this.state.importantCount = data.importantCount;
    }
    if(data.doneCount !== undefined){
      this.state.doneCount = data.doneCount;
    }
    if(data.items === undefined || !data.items){
      return;
    }
    this.state.items = [];
    data.items.forEach((currentValue) => {
      const newItem = {
        id: currentValue._id,
        label: currentValue.label,
        important: currentValue.important,
        done: currentValue.done
      };
      this.state.items = [...this.state.items, newItem];
    });
  };

  async getList ({action = "load"} = {}) {
    var url = new URL(apiBase);
    const body = {
      filter: this.state.filter,
      search: this.state.search
    };
    Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));

    try {
      let data = await makeRequest(url, "GET");
      this._transformItems(data);
    } catch(e) {
      return Promise.reject(`Error ${action}`);
    }

    return Promise.resolve(this.formResult());
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
    const params = {
      label: item,
      filter: this.state.filter,
      search: this.state.search
    };
    const url = new URL(apiBase+'todo');
    await makeRequest(url, "POST", params);
    return this.getList({action: 'add'});
  }

  async deleteItem(id) {
    const params = {
      id: id,
      filter: this.state.filter,
      search: this.state.search
    };
    const url = new URL(apiBase+'todo');
    await makeRequest(url, "DELETE", params);
    return this.getList({action: 'delete'});
  }

  async toggleDone(id) {
    const params = {
      id: id,
      filter: this.state.filter,
      search: this.state.search,
      toggleDone: 1
    };
    const url = new URL(apiBase+'todo');
    await makeRequest(url, "PUT", params);
    return this.getList({action: 'change done state'});
  }

  async toggleImportant(id) {
    const params = {
      id: id,
      filter: this.state.filter,
      search: this.state.search,
      toggleImportant: 1
    };
    const url = new URL(apiBase+'todo');
    await makeRequest(url, "PUT", params);
    return this.getList({action: 'change important state'});
  }
}