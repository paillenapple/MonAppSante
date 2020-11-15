var { capitalize, deburr, trim } = require("lodash");

exports.parseFirstname = function (string) {
  if (typeof string === "string") {
    let parsedString = string;
    parsedString = deburr(trim(parsedString));
    if (parsedString.indexOf(" ") !== -1) {
      parsedString = parsedString
        .split(" ")
        .map((subst) => capitalize(subst))
        .join(" ");
    }
    if (parsedString.indexOf("-") !== -1) {
      parsedString = parsedString
        .split("-")
        .map((subst) => capitalize(subst))
        .join("-");
    }
    return parsedString;
  } else {
    return string;
  }
};

exports.parseSurname = function (string) {
  if (typeof string === "string") {
    let parsedString = string;
    parsedString = deburr(trim(parsedString)).toUpperCase();
    return parsedString;
  } else {
    return string;
  }
};

exports.capFirstLetter = function (string) {
  if (typeof string === "string") {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return string;
  }
};

exports.uppercase = function (string) {
  if (typeof string === "string") {
    return string.toUpperCase();
  } else {
    return string;
  }
};

exports.lowercase = function (string) {
  if (typeof string === "string") {
    return string.toLowerCase();
  } else {
    return string;
  }
};
