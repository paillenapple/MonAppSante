const express = require('express');
const router = express.Router();

const jobCtrl = require('../controllers/job');

router.post('/create', jobCtrl.createJob);
// router.patch('/edit/:id', patientCtrl.editPatient);
router.get('/count-total-number-jobs', jobCtrl.countTotalJobs);
router.get('/read-current-page-jobs', jobCtrl.readCurrentPageJobs);
router.get('/read-one/:id', jobCtrl.readOneJob);

module.exports = router;