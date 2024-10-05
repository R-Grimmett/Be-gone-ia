const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require("../../controllers/problemController");

router.route('/')
    .get(controller.getAllProblems)
    .post(controller.createProblem)
    .put(controller.updateProblem)
    .delete(controller.deleteProblem);

router.route('/id/:id')
    .get(controller.getProblem);

router.route('/search/:searchTerm')
    .get(controller.searchProblem);

router.route('/:category')
    .get(controller.getAllCategory);

module.exports = router;