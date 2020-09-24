const bcrypt = require("bcrypt");
const User = require("./../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        surname: req.body.surname,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            message: `Vous êtes maintenant connecté(e), ${user.firstname}${" "}${user.surname}`,
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_STRING,
              { expiresIn: "24h" }
            ),
            firstname: user.firstname,
            surname: user.surname,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUserInfos = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json({
      userId: user._id,
      firstname: user.firstname,
      surname: user.surname,
    }))
    .catch((error) => res.status(404).json({ error }));
};
