const express = require('express');
const router = express();
const path = require('path');

router.get('^/$|/problem-database/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'problem-database', 'index.html'));
});

module.exports = router;