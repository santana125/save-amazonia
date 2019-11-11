const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: "Token required."});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({error: "Token error"});
    
    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: "token malformed"});

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) return res.status(401).send({error: "Invalid Token"});
        
        req.user_id = decoded.id;
        return next();

    });
}
