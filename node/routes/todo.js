const { Router } = require('express');
const router = Router();
const express = require('express');
const { todoService } = require("../service/todo-service");
const {filterList} = require("../define");

const service = new todoService();

// get List
router.get('/', async (req, res) => {
  const filter = req.query.filter ? req.query.filter : filterList.all;
  const search = req.query.search ? req.query.search : "";
  const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
  const pageLimit = req.query.pageLimit ? req.query.pageLimit : 16;

  //console.log(req.query, pageNumber, pageLimit);

  const todos = await service.getList({filter, search, pageNumber, pageLimit});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(todos));
});

router.put('/todo', express.json({type: '*/*'}), async (req, res) => {
  let {id, filter, search, pageNumber, pageLimit} = req.body;
  if(req.body.toggleImportant){
    await service.toggleImportant(id);
  }
  if(req.body.toggleDone){
    await service.toggleDone(id);
  }

  const todos = await service.getList({filter, search, pageNumber, pageLimit});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(todos));
});

router.delete('/todo', express.json({type: '*/*'}), async (req, res) => {
  let {id, filter, search, pageNumber, pageLimit} = req.body;
  await service.deleteItem(id);

  const todos = await service.getList({filter, search, pageNumber, pageLimit});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(todos));
});

router.post('/todo', express.json({type: '*/*'}), async (req, res) => {
  let {label, filter, search, pageNumber, pageLimit} = req.body;
  await service.addItem(label);

  const todos = await service.getList({filter, search, pageNumber, pageLimit});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(todos));
});

module.exports = router;