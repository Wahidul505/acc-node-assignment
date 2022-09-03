const express = require('express');
const { getAllUsers, getARandomUser, saveAUser } = require('../../controller/user.controller');
const router = express.Router();

router.get('/all', getAllUsers);
router.get('/random', getARandomUser);
router.post('/save', saveAUser);

module.exports = router;