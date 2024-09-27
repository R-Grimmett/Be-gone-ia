const express = require('express');
const router = express();
const path = require('path');

router.get('/problems/all-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'problems', 'all-database.html'));
});

router.get('^/$|/help-my-plant(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'help-my-plant.html'));
});

router.get('^/$|/plant-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'plant-database.html'));
});

router.get('^/$|/problem-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'problem-database.html'));
});

module.exports = router;