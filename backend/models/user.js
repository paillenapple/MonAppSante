const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, uniqueCaseInsensitive: true },
  password: { type: String, required: true, minLength: 6 },
  firstname: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z].*[a-zA-Z]$/,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z].*[a-zA-Z]$/,
    uppercase: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["demandeur", "recruteur"],
  },
  city: {
    type: String,
    required: function () {
      return this.status === "recruteur";
    },
    trim: true,
    match: /^[a-zA-Z].*[a-zA-Z]$/,
    uppercase: true,
  },
  favorites: {
    type: Array,
    required: true,
  },
  notifications: {
    type: Array,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
