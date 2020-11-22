const Job = require("./../models/job");
const User = require("./../models/user");
const {
  capFirstLetter,
  parseFirstname,
  parseSurname,
  uppercase,
} = require("./../utils/dataParsing");

exports.createJob = (req, res, next) => {
  const job = new Job({
    recruiterId: req.body.recruiterId,
    recruiterFirstname: parseFirstname(req.body.recruiterFirstname),
    recruiterSurname: parseSurname(req.body.recruiterSurname),
    jobType: req.body.jobType,
    jobStartDate: req.body.jobStartDate,
    jobEndDate: req.body.jobEndDate,
    jobCity: capFirstLetter(req.body.jobCity),
    maternity: req.body.maternity === "yes" ? true : false,
    maternityRequired: req.body.maternityRequired === "yes" ? true : false,
  });
  job
    .save()
    .then(() => res.status(201).json({ message: "Nouvelle annonce créée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// exports.editPatient = (req, res, next) => {
//   Patient.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Dossier patient modifié !" }))
//     .catch((error) => res.status(400).json({ error }));
// };

exports.deleteOneJob = (req, res, next) => {
  const user = JSON.parse(req.body.user);
  console.log(user.firstname);
  Promise.all([
    Job.deleteOne({ _id: req.body.id }),
    User.updateMany(
      { favorites: { $elemMatch: { _id: req.body.id } } },
      {
        $pull: { favorites: { _id: req.body.id } },
        $push: {
          notifications: `L'annonce ${req.body.id} a été supprimée par le Dr ${
            user.firstname
          }${" "}${user.surname} !`,
        },
      }
    ),
  ])
    .then(([jobs, resultat]) => {
      console.log({ jobs }, { resultat });
      res.status(200).json(jobs);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.countTotalJobs = (req, res, next) => {
  Job.estimatedDocumentCount()
    .then((total) => res.status(200).json(total))
    .catch((error) => res.status(404).json({ error }));
};

exports.readCurrentPageJobs = (req, res, next) => {
  Job.find()
    .skip(parseInt(req.query.offset))
    .sort({ [req.query.sortBy]: parseInt(req.query.order) })
    .limit(parseInt(req.query.limit))
    .then((jobs) => res.status(200).json(jobs))
    .catch((error) => res.status(404).json({ error }));
};

exports.readActiveRecruiterJobs = (req, res, next) => {
  Job.find({ recruiterId: req.params.id })
    .then((jobs) => res.status(200).json(jobs))
    .catch((error) => res.status(404).json({ error }));
};

exports.readOneJob = (req, res, next) => {
  Job.findOne({ _id: req.params.id })
    .then((job) => {
      res.status(200).json({
        jobId: job._id,
        recruiterId: parseFirstname(job.recruiterId),
        recruiterFirstname: parseFirstname(job.recruiterFirstname),
        recruiterSurname: parseSurname(job.recruiterSurname),
        jobType: job.jobType,
        jobStartDate: job.jobStartDate,
        jobEndDate: job.jobEndDate,
        jobCity: capFirstLetter(job.jobCity),
        maternity: job.maternity,
        maternityRequired: job.maternityRequired,
      });
    })
    .catch((error) => res.status(404).json({ error }));
};
