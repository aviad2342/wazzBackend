const mongoose = require('mongoose');
const message = require('./message');
const user = require('./user');
// const uniqueValidator = require('mongoose-unique-validator');


const chatSchema = mongoose.Schema({
  id : { type: String, required: true, unique: true },
  users: user[],
  userImage: { type: String, required: true },
  messages: message[]
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Chat", chatSchema);