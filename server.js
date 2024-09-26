const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// Cross-Origin Resource Sharing
// TODO: Remove dev whitelist options for release
const whitelist = ['https://www.SITENAME.com', 'http://127.0.0.1:5500', 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Origin not allowed by CORS: ${origin}`));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Middleware for handling specific types of data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve Static Files
app.use(express.static(path.join(__dirname, '/public')));

// Routing
app.use('/', require('./routes/root'));

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

app.listen(PORT, () => console.log(`Listening on ${PORT}`));