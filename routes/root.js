const express = require('express');
const router = express();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('^/$|/help-my-plant(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'help-my-plant.html'));
});

router.get('^/$|/plant(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'plant.html'));
});

router.get('^/$|/problems(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'problems.html'));
});

module.exports = router;