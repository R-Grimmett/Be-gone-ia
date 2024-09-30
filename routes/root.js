const express = require('express');
const router = express();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/help-my-plant(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'help-my-plant.html'));
});

router.get('/plant-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'plant-database.html'));
});

router.get('/problem-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'problem-database.html'));
});

router.get('/all-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'all-database.html'));
});

router.get('/disease-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'disease-database.html'));
});

router.get('/pest-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'pest-database.html'));
});

router.get('/about(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
});

module.exports = router;