const { Router } = require('express');
const router = Router();
const express = require('express');
const { todoService } = require("../service/todo-service");
const filterList = require("../define");

const service = new todoService();

// get List
router.get('/', async (req, res) => {
  const filter = req.query.filter ? req.query.filter : filterList.all;
  const search = req.query.search ? req.query.search : "";
  const todos = await service.getList({filter, search});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(todos));
});

router.put('/todo', express.json({type: '*/*'}), async (req, res) => {
  let {id, filter, search} = req.body;
  if(req.body.toggleImportant){
    await service.toggleImportant(id);
  }
  if(req.body.toggleDone){
    await service.toggleDone(id);
  }

  const todos = await service.getList({filter, search});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(todos));
});

router.delete('/todo', express.json({type: '*/*'}), async (req, res) => {
  let {id, filter, search} = req.body;
  service.deleteItem(id);

  const todos = await service.getList({filter, search});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(todos));
});

router.post('/todo', express.json({type: '*/*'}), async (req, res) => {
  let {label, filter, search} = req.body;
  service.addItem(label);

  const todos = await service.getList({filter, search});
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(todos));
});

module.exports = router;