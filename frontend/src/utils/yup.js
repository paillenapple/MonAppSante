const yup = require("yup");

const loginPayloadSchema = yup.object().shape({
  email: yup
    .string()
    .required("Ce champ est obligatoire")
    .email("Le format de l'adresse électronique est incorrect"),
  password: yup
    .string()
    .required("Ce champ est obligatoire")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const signupPayloadSchema = yup.object().shape({
  email: yup
    .string()
    .required("Ce champ est obligatoire")
    .email("Le format de l'adresse électronique est incorrect"),
  password1: yup
    .string()
    .required("Ce champ est obligatoire")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  password2: yup
    .string()
    .required("Ce champ est obligatoire")
    .oneOf(
      [yup.ref("password1"), null],
      "Les mots de passe doivent être identiques"
    ),
  firstname: yup.string().required("Ce champ est obligatoire"),
  surname: yup.string().required("Ce champ est obligatoire"),
});

const newPatientPayloadSchema = yup.object().shape({
  firstname: yup.string().required("Ce champ est obligatoire"),
  surname: yup.string().required("Ce champ est obligatoire"),
  dob: yup.date().required("Ce champ est obligatoire"),
});



export { loginPayloadSchema, signupPayloadSchema, newPatientPayloadSchema };
