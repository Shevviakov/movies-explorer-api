const allowedCors = [
    'https://sheviakov.nomoredomains.xyz',
    'http://sheviakov.nomoredomains.xyz',
    'https://api.sheviakov.nomoredomains.monster',
    'http://api.sheviakov.nomoredomains.monster',
    'http://localhost:3000',
];

module.exports = (req, res, next) => {
    const { origin } = req.headers;
    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        res.header('Access-Control-Allow-Headers', requestHeaders);
        res.header('Access-Control-Allow-Credentials', 'true');
        return res.end();
    }

    return next();
};