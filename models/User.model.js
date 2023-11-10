const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   email: String,
   password: String,
   phone_number:Number
});

const User = mongoose.model("user", UserSchema);

module.exports = User;