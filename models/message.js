const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');


const messageSchema = mongoose.Schema({
  from: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  to: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  date: { type: Date, required: true , default: new Date()},
  body: { type: String }
});



// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Message", messageSchema);