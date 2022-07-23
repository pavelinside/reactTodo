const Todo = require('../models/Todo');
const {filterList} = require("../define");
const {Types} = require("mongoose");

class todoService {
  async getList({filter = filterList.all, search = '', pageNumber = 1, pageLimit = 16}) {
    const findOptions = Object.assign({}, this.getFilter(filter));
    if(search){
      findOptions.label = {'$regex' : search, '$options' : 'i'};
    }

    const counts = await this.getCounts(findOptions);
    const pagesTotal = Math.ceil(counts.allCount / pageLimit);
    if(pageNumber > pagesTotal && pagesTotal > 0){
      pageNumber = pagesTotal;
    }

    const skip = (pageNumber - 1) * pageLimit;
    const items = await Todo.find(findOptions).skip(skip).limit(pageLimit);

    return {
      ...counts,
      items
    };
  }

  getFilter(filter = filterList.all) {
    switch(filter) {
    case filterList.active:
      return {done: false};
    case filterList.important:
      return {important: true};
    case filterList.done:
      return {done: true};
    }
    return {};
  }

  async getCounts(findOptions = {}){
    const doneCount = await Todo.count(Object.assign({}, findOptions, {done: true}));
    const importantCount = await Todo.count(Object.assign({}, findOptions, {important: true}));
    const allCount = await Todo.count(findOptions);
    return {
      doneCount,
      importantCount,
      allCount
    };
  }

  async addItem(label) {
    const newItem = {
      label: label,
      done: false,
      important: false
    };
    await Todo.create(newItem);
  }

  async deleteItem(id) {
    if(Types.ObjectId.isValid(id)) {
      await Todo.deleteOne({ _id: id });
    }
  }

  async toggleImportant(id) {
    if(Types.ObjectId.isValid(id)) {
      const row = await Todo.findOne({_id:id});
      if(row){
        await Todo.updateOne({ _id: id },{ important: !row.important });
      }
    }
  }

  async toggleDone(id) {
    if(Types.ObjectId.isValid(id)) {
      const row = await Todo.findOne({_id:id});
      if(row){
        await Todo.updateOne({ _id: id },{ done: !row.done });
      }
    }
  }
}

exports.todoService = todoService;