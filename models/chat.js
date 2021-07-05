const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');
const { ObjectId } = require('bson');

// const uniqueValidator = require('mongoose-unique-validator');


const chatSchema = mongoose.Schema({
  id : { type: String, required: true, unique: true },
  users: [String],
  messages: [{
    fromUser: { type: String, required: true },
    toUser: { type: String, required: true },
    date: { type: Date, default: new Date()},
    body: { type: String }
  }]
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Chat", chatSchema);