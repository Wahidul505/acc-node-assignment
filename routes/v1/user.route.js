const express = require('express');
const { getAllUsers, getARandomUser } = require('../../controller/user.controller');
const router = express.Router();

router.get('/all', getAllUsers);
router.get('/random', getARandomUser);

module.exports = router;