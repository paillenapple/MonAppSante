const Patient = require("./../models/patient");
const { capFirstLetter, parseFirstname, parseSurname, uppercase } = require("./../utils/dataParsing");

exports.createPatient = (req, res, next) => {
  const patient = new Patient({
    firstname: parseFirstname(req.body.firstname),
    surname: parseSurname(req.body.surname),
    dob: req.body.dob,
  });
  patient
    .save()
    .then(() => res.status(201).json({ message: "Dossier patient créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.editPatient = (req, res, next) => {
  Patient.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Dossier patient modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.countTotalPatients = (req, res, next) => {
  Patient.estimatedDocumentCount()
    .then((total) => res.status(200).json(total))
    .catch((error) => res.status(404).json({ error }));
};

exports.readCurrentPagePatients = (req, res, next) => {
  Patient.find()
    .skip(parseInt(req.query.offset))
    .sort({ [req.query.sortBy]: parseInt(req.query.order) })
    .limit(parseInt(req.query.limit))
    .then((patients) => res.status(200).json(patients))
    .catch((error) => res.status(404).json({ error }));
};

exports.readOnePatient = (req, res, next) => {
  Patient.findOne({ _id: req.params.id })
    .then((patient) => {
      res.status(200).json({
        patientId: patient._id,
        firstname: capFirstLetter(patient.firstname),
        surname: uppercase(patient.surname),
        dob: patient.dob,
      });
    })
    .catch((error) => res.status(404).json({ error }));
};
