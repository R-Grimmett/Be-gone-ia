const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../../controllers/dbController');

router.route('/family')
    .get(controller.getFamilies)

module.exports = router;