const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const patientSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    index: true,
    trim: true,
    match: /^[a-zA-Z].*[a-zA-Z]$/,
  },
  surname: {
    type: String,
    required: true,
    index: true,
    trim: true,
    match: /^[a-zA-Z].*[a-zA-Z]$/,
    uppercase: true,
  },
  dob: {
    type: String,
    required: true,
    index: true,
    match: /^\d\d\/\d\d\/\d\d\d\d$/,
  },
});

patientSchema.index({ firstname: 1, surname: 1, dob: 1 }, { unique: true });

patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Patient", patientSchema);
