const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo');
const {define} = require('./define');

const PORT = process.env.PORT || 3000;
const app = express();

//app.use(express.json({type: '*/*'})); //app.use(express.json()); // not working
//app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", define.ALLOW_ORIGIN); // "*"
  res.setHeader("Access-Control-Allow-Methods", define.ALLOW_METHODS);
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(define.CONNECT_PATH, {});
    app.listen(PORT, () => {
      console.log('Server has been started...');
    })
  } catch (e) {
    console.log(e);
  }
}

start();