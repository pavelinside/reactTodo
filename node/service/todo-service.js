const Todo = require('../models/Todo');
const {filterList} = require("../define");
const mongoose = require("mongoose");

class todoService {
  async getList({filter = filterList.all, search = ''}) {
    const findOptions = Object.assign({}, this.getFilter(filter));
    if(search){
      findOptions.label = {'$regex' : search, '$options' : 'i'};
    }
    const items = await Todo.find(findOptions);

    const counts = await this.getCounts();

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

  async getCounts(){
    const doneCount = await Todo.count({done: true});
    const importantCount = await Todo.count({important: true});
    const allCount = await Todo.count();
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
    if(mongoose.Types.ObjectId.isValid(id)) {
      await Todo.remove({ _id: id });
    }
  }

  async toggleImportant(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      const row = await Todo.findOne({_id:id});
      if(row){
        await Todo.update({ _id: id },{ important: !row.important });
      }
    }
  }

  async toggleDone(id) {
    if(mongoose.Types.ObjectId.isValid(id)) {
      const row = await Todo.findOne({_id:id});
      if(row){
        await Todo.update({ _id: id },{ done: !row.done });
      }
    }
  }
}

exports.todoService = todoService;