const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const patientSchema = mongoose.Schema({
  firstname: {type: String, required: true},
  surname: {type: String, required: true},
  dob: {type: Date, required: true}
});

patientSchema.index({ firstname: 1, surname: 1, dob: 1 }, { uniqueCaseInsensitive: true });

patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Patient", patientSchema);
