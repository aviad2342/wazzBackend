const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  phone : { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);