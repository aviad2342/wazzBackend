const mongoose = require('mongoose');
const user = require('./user');
// const uniqueValidator = require('mongoose-unique-validator');


const messageSchema = mongoose.Schema({
  from_user: { type: user, required: true },
  date: { type: Date, required: true },
  body: { type: String }
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Message", messageSchema);