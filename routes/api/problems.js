const express = require('express');
const router = express.Router();
const path = require('path');

const debug = (req, res, next) => {
    console.log('accessed');
    next();
}
router.get('/problems/all-database(.html)?', (req, res) => {
    console.log('accessed');
    res.sendFile(path.join(__dirname, '..', 'views', 'problems', 'all-database.html'));
});

router.get('^/problems/help-my-plant(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'help-my-plant.html'));
});

router.get('^/$|/plant-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'plant-database.html'));
});

router.get('^/$|/problem-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'problem-database.html'));
});

module.exports = router;