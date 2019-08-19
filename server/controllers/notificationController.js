const NotificationModel = require('../models/NotificationModel');
const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');

const visited = (req, res) => {
      const token = req.body.authToken || req.query.authToken;
      jwt.verify(token, config.jwtSecret, async (err, decoded) => {
            NotificationModel.visited(decoded.uuid, req.body)
                  .then(username => res.status(200).json({ username }))
                  .catch(err => res.status(400).send('Error'));
      });
};

module.exports = {
      visited,
};
