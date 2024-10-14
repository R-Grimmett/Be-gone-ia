const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../../controllers/dbController');

router.route('/family')
    .get(controller.getFamilies)

router.route('/reference')
    .get(controller.getReferences)

module.exports = router;