'use strict';

const API_HEADER = 'api_key';

const apiAuthMiddleware = (req, res, next) => {

    if(req.get(API_HEADER) === undefined || req.get(API_HEADER) !== process.env.API_KEY) {
        console.log('throw 500');
        return res.status(500).send('API key required');
    }

    res.locals.isApiAuthenticated = true;

    return next();
};

module.exports = {
    apiAuthMiddleware
};
