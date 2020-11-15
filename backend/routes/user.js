const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.patch("/set-job-as-favorite/:id", userCtrl.setJobAsFavorite);
router.get('/getuserinfos/:id', userCtrl.getUserInfos);

module.exports = router;