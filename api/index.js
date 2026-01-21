const app = require('../server/server.js');

module.exports = (req, res) => {
    console.log('Incoming API request:', req.method, req.url);
    return app(req, res);
};
