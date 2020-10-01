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
