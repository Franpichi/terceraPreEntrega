const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/current', UserController.getCurrentUser);

module.exports = router;
