const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('../models/User');

const authenticate = (req, res, next) => {
  const token = req.body.authToken || req.query.authToken;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      try {
        const uuidIsValid = await User.uuidExists(decoded.uuid);
        uuidIsValid ? next() : res.status(401).send('Unauthorized: Invalid token');
      } catch {
        res.status(401).send('Unauthorized: Invalid token');
      }
    });
  }
}

module.exports = authenticate;
