const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');
const { ObjectId } = require('bson');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');


const chatSchema = mongoose.Schema({
  id : { type: String, required: true, unique: true },
  // from: { 
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true 
  // },
  // to: { 
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true 
  // },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
    default: []
  }]
});


module.exports = mongoose.model("Chat", chatSchema);