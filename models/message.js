const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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


module.exports = mongoose.model("Message", messageSchema);