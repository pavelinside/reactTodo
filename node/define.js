const filterList = {
  active: "active",
  all: "all",
  done: "done",
  important: "important"
};
const define = {
  ALLOW_ORIGIN: "http://localhost:8081",
  ALLOW_METHODS: "POST,GET,PUT,DELETE,OPTIONS",
  CONNECT_PATH: "mongodb+srv://todouser:rQm44Xq3LvMxu0ca@cluster0.ttyzuif.mongodb.net/todos"
};

exports.filterList = filterList;
exports.define = define;