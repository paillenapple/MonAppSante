const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  recruiterFirstname: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z].*[a-zA-Z]$/,
  },
  recruiterSurname: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z].*[a-zA-Z]$/,
    uppercase: true,
  },
  jobStartDate: {
    type: String,
    required: true,
    match: /^\d\d\/\d\d\/\d\d\d\d$/,
  },
  jobEndDate: {
    type: String,
    required: true,
    match: /^\d\d\/\d\d\/\d\d\d\d$/,
  },
  jobCity: {
    type: String,
    required: true,
    trim: true,
    match: /^[a-zA-Z].*[a-zA-Z]$/,
  },
  maternity: {
    type: Boolean,
    required: true,
  },
  maternityRequired: {
    type: Boolean,
    required: function () {
      return this.maternity === true;
    },
  },
});

module.exports = mongoose.model("Job", jobSchema);
