import initialState from "../reducers/initial-state";
import {makeRequest, apiBase} from "./node-request";

export default class NodeTodoService {
  state = {
    items: [],
    filter: initialState.filter,
    search: initialState.search,
    pageNumber: initialState.pageNumber,
    pageLimit: initialState.pageLimit,
    error: ""
  };

  formResult(data) {
    let doneCount = initialState.doneCount;
    let importantCount = initialState.importantCount;
    let allCount = initialState.allCount;
    if(data.allCount !== undefined){
      allCount = data.allCount;
    }
    if(data.importantCount !== undefined){
      importantCount = data.importantCount;
    }
    if(data.doneCount !== undefined){
      doneCount = data.doneCount;
    }
    if(data.doneCount !== undefined){
      doneCount = data.doneCount;
    }

    this._transformItems(data);

    const pagesTotal = Math.ceil(allCount / this.state.pageLimit);
    if(this.state.pageNumber > pagesTotal){
      this.state.pageNumber = pagesTotal;
    }

    return {
      items: this.state.items,
      doneCount,
      importantCount,
      allCount,
      pageNumber: this.state.pageNumber,
      pagesTotal
    };
  }

  _transformItems = (data) => {
    this.state.items = [];
    if(!data){
      return;
    }
    if(data.items === undefined || !data.items){
      return;
    }
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

  getDefaultParams = () => {
    return {
      filter: this.state.filter,
      search: this.state.search,
      pageNumber: this.state.pageNumber,
      pageLimit: this.state.pageLimit
    };
  }

  async getList ({action = "load"} = {}) {
    var url = new URL(apiBase);
    const body = this.getDefaultParams();
    Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));

    try {
      let data = await makeRequest(url, "GET");
      return Promise.resolve(this.formResult(data));
    } catch(e) {
      return Promise.reject(`Error ${action}`);
    }
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
    const def = this.getDefaultParams();
    const params = {
      ...def,
      label: item
    };
    const url = new URL(apiBase+'todo');
    await makeRequest(url, "POST", params);
    return this.getList({action: 'add'});
  }

  async deleteItem(id) {
    const def = this.getDefaultParams();
    const params = {
      ...def,
      id: id
    };
    const url = new URL(apiBase+'todo');
    await makeRequest(url, "DELETE", params);
    return this.getList({action: 'delete'});
  }

  async toggleDone(id) {
    const def = this.getDefaultParams();
    const params = {
      ...def,
      id: id,
      toggleDone: 1
    };
    const url = new URL(apiBase+'todo');
    await makeRequest(url, "PUT", params);
    return this.getList({action: 'change done state'});
  }

  async toggleImportant(id) {
    const def = this.getDefaultParams();
    const params = {
      ...def,
      id: id,
      toggleImportant: 1
    };
    const url = new URL(apiBase+'todo');
    await makeRequest(url, "PUT", params);
    return this.getList({action: 'change important state'});
  }

  async setPageNumber(pageNumber = 1) {
    if(pageNumber <= 0){
      return Promise.reject("Incorrect pageNumber");
    }
    this.state.pageNumber = pageNumber;
    return this.getList({action: 'pageNumber'});
  }
}