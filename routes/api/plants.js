const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../../controllers/plantController');

router.route('/')
    .get(controller.getAllPlants)
    .post(controller.createPlant)
    .put(controller.updatePlant)
    .delete(controller.deletePlant);

router.route('/:id')
    .get(controller.getPlant);

module.exports = router;