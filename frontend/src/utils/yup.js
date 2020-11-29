const yup = require("yup");

const loginPayloadSchema = yup.object().shape({
  email: yup
    .string()
    .required("Une valeur (adresse électronique) est attendue")
    .email("Le format de l'adresse électronique est incorrect"),
  password: yup
    .string()
    .required("Une valeur (mot de passe) est attendue")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const signupPayloadSchema = yup.object().shape({
  email: yup
    .string()
    .required("Une valeur (adresse électronique) est attendue")
    .email("Le format de l'adresse électronique est incorrect"),
  password1: yup
    .string()
    .required("Une valeur (mot de passe) est attendue")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  password2: yup
    .string()
    .required("Une valeur (confirmation du mot de passe) est attendue")
    .oneOf(
      [yup.ref("password1"), null],
      "Les mots de passe doivent être identiques"
    ),
  firstname: yup
    .string()
    .matches(/^[a-zA-Z].*[a-zA-Z]$/, {
      message: "Le prénom doit commencer et se terminer par une lettre",
    })
    .required("Une valeur (prénom de l'utilisateur) est attendue"),
  surname: yup
    .string()
    .matches(/^[a-zA-Z].*[a-zA-Z]$/, {
      message: "Le nom de famille doit commencer et se terminer par une lettre",
    })
    .required("Une valeur (nom de famille de l'utilisateur) est attendue"),
  status: yup
    .string()
    .oneOf(["demandeur", "recruteur"])
    .required("Une valeur (statut de l'utilisateur) est attendue"),
  city: yup.string().when("status", {
    is: "recruteur",
    then: yup
      .string()
      .matches(/^[a-zA-Z].*[a-zA-Z]$/, {
        message:
          "Le nom de la ville doit commencer et se terminer par une lettre",
      })
      .required("Une valeur (nom de la ville) est attendue"),
  }),
});

const newJobForm11Schema = yup.object().shape({
  jobType: yup
    .string()
    .oneOf([
      "Remplacement ponctuel",
      "Remplacements récurrents",
      "Remplacements réguliers",
    ])
    .required("Une valeur (type de remplacement) est attendue"),
});

const newJobForm21Schema = yup.object().shape({
  recruiterFirstname: yup
    .string()
    .matches(/^[a-zA-Z].*[a-zA-Z]$/, {
      message:
        "Le prénom du médecin remplacé doit commencer et se terminer par une lettre",
    })
    .required("Une valeur (prénom du médecin remplacé) est attendue"),
  recruiterSurname: yup
    .string()
    .matches(/^[a-zA-Z].*[a-zA-Z]$/, {
      message:
        "Le nom de famille du médecin remplacé doit commencer et se terminer par une lettre",
    })
    .required("Une valeur (nom de famille du médecin remplacé) est attendue"),
  jobStartDate: yup
    .date()
    .nullable()
    .required("Une valeur (premier jour du remplacement proposé) est attendue"),
  jobEndDate: yup
    .date()
    .nullable()
    .required("Une valeur (dernier jour du remplacement proposé) est attendue"),
  jobCity: yup
    .string()
    .matches(/^[a-zA-Z].*[a-zA-Z]$/, {
      message:
        "Le nom de la ville doit commencer et se terminer par une lettre",
    })
    .required(
      "Une valeur (nom de la ville où a lieu le remplacement) est attendue"
    ),
  maternity: yup
    .string()
    .oneOf(["yes", "no"])
    .required("Une valeur est attendue"),
  maternityRequired: yup.string().when("maternity", {
    is: "yes",
    then: yup.string().oneOf(["yes", "no"]).required("Une valeur est attendue"),
  }),
});

export {
  loginPayloadSchema,
  signupPayloadSchema,
  newJobForm11Schema,
  newJobForm21Schema,
};
