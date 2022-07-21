const { Schema, model } = require('mongoose');

const schema = new Schema({
  label: {
    type: String,
    required: true
  },
  // created: {    type: Date  },
  done: {
    type: Boolean,
    default: false
  },
  important: {
    type: Boolean,
    default: false
  }
});

module.exports = model('Todo', schema);