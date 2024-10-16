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

router.get('/care-database(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'care-database.html'));
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

router.get('/plant_id=:id', (req, res) => {
    if(!req?.params?.id) res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
    else res.sendFile(path.join(__dirname, '..', 'views', 'plant-view.html'));
});

router.get('/problem_id=:id', (req, res) => {
    if(!req?.params?.id) res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
    else res.sendFile(path.join(__dirname, '..', 'views', 'problem-view.html'));
})

module.exports = router;