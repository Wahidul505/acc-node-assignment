const express = require('express');
const { getAllUsers } = require('../../controller/user.controller');
const router = express.Router();

router.get('/all', getAllUsers);

module.exports = router;