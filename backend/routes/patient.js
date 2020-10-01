const express = require('express');
const router = express.Router();

const patientCtrl = require('../controllers/patient');

router.post('/create', patientCtrl.createPatient);
router.get('/readall', patientCtrl.readAllPatients);
router.get('/readone/:id', patientCtrl.readOnePatient);

module.exports = router;