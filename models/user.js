const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
  phone : { type: String, required: true, unique: true },
  name: { type: String, required: true },
  userImage: { type: String, required: true },
  is_active: { type: Boolean, default: false }
});

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);