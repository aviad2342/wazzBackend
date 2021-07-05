const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


const messageSchema = mongoose.Schema({
  fromUser: { type: String, required: true },
  toUser: { type: String, required: true },
  date: { type: Date, required: true , default: new Date()},
  body: { type: String }
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Message", messageSchema);