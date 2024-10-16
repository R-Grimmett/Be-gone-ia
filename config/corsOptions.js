const whitelist = [`${process.env.ROOT_URL}`];

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