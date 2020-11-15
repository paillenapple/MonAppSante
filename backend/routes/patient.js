const express = require('express');
const router = express.Router();

const patientCtrl = require('../controllers/patient');

router.post('/create', patientCtrl.createPatient);
router.patch('/edit/:id', patientCtrl.editPatient);
router.get('/count-total-number-patients', patientCtrl.countTotalPatients);
router.get('/read-current-page-patients', patientCtrl.readCurrentPagePatients);
router.get('/read-one/:id', patientCtrl.readOnePatient);

module.exports = router;