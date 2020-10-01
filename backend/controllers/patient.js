const Patient = require("./../models/patient");
const { capFirstLetter, uppercase } = require("./../utils/dataParsing");

exports.createPatient = (req, res, next) => {
  const patient = new Patient({
    firstname: capFirstLetter(req.body.firstname),
    surname: uppercase(req.body.surname),
    dob: req.body.dob,
  });
  patient
    .save()
    .then(() => res.status(201).json({ message: "Patient créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.readAllPatients = (req, res, next) => {
  Patient.find()
    .then((patients) => res.status(200).json(patients))
    .catch((error) => res.status(404).json({ error }));
};

exports.readOnePatient = (req, res, next) => {
  Patient.findOne({ _id: req.params.id })
    .then((patient) =>
      res.status(200).json({
        patientId: patient._id,
        firstname: capFirstLetter(patient.firstname),
        surname: uppercase(patient.surname),
        dob: patient.dob,
      })
    )
    .catch((error) => res.status(404).json({ error }));
};
