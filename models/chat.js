const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');
const { ObjectId } = require('bson');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');


const chatSchema = mongoose.Schema({
  id : { type: String, required: true, unique: true },
  // users: [String],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
    default: []
  }]
});

// chatSchema.index({
//   users: 1
// })


module.exports = mongoose.model("Chat", chatSchema);