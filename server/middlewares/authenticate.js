const jwt = require('jsonwebtoken')
const config = require('./config')

const authenticate = (req, res, next) => {
  const token = req.body.authToken || req.query.authToken

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        next()
      }
    });
  }
}

module.exports = authenticate

