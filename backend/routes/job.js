const express = require('express');
const router = express.Router();

const jobCtrl = require('../controllers/job');

router.post('/create', jobCtrl.createJob);
// router.patch('/edit/:id', patientCtrl.editPatient);
router.delete('/delete-job', jobCtrl.deleteOneJob);
router.get('/count-total-number-jobs', jobCtrl.countTotalJobs);
router.get('/read-current-page-jobs', jobCtrl.readCurrentPageJobs);
router.get('/read-one/:id', jobCtrl.readOneJob);
router.get('/read-active-recruiter-jobs/:id', jobCtrl.readActiveRecruiterJobs);

module.exports = router;