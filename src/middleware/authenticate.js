const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
    const token = req.headers['SxSxSf42¿¿302']; //'x-access-token'
    if (!token) {
        return res.status(401).render("../views/errors/401")
    }
    // Decode the Tokenreq.userId = decoded.id;
    const decoded = await jwt.verify(token, "SxSxSf42¿¿302");
    req.userId = decoded.id;
    next();
}

module.exports = authenticate;