require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require("./config/corsOptions");

const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000;

// connect to mongoDB
connectDB();

// custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

// Middleware for handling specific types of data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve Static Files
app.use('/controllers', express.static(path.join(__dirname, '/controllers')));
app.use('/problems', express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/public')));


// Routing
app.use('/', require('./routes/root'));
app.use('/problems', require('./routes/problems'));


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established');
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});
