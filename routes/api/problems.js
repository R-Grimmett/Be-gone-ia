const express = require('express');
const router = express.Router();
const path = require('path');

const debug = (req, res, next) => {
    console.log('accessed');
    next();
}

module.exports = router;