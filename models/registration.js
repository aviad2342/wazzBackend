const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
  email : { type: String, required: true, unique: true },
  token: { type: String, required: true }
});

module.exports = mongoose.model("Registration", registrationSchema);