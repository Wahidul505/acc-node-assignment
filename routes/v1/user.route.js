const express = require('express');
const { getAllUsers, getARandomUser, saveAUser, updateAUser, updateMultipleUsers } = require('../../controller/user.controller');
const router = express.Router();

router.get('/all', getAllUsers);
router.get('/random', getARandomUser);
router.post('/save', saveAUser);
router.patch('/update', updateAUser);
router.patch('/bulk-update', updateMultipleUsers);

module.exports = router;