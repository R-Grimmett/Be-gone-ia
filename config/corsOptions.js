// Cross-Origin Resource Sharing
// TODO: Remove dev whitelist options for release
const whitelist = ['https://www.SITENAME.com',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://localhost:8080'];

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

module.exports = corsOptions;