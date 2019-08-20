const NotificationModel = require('../models/NotificationModel');
const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');

const getNotifications = (req, res) => {
      const token = req.body.authToken || req.query.authToken;
      jwt.verify(token, config.jwtSecret, async (err, decoded) => {
            try {
                  const notifications = await NotificationModel.getNotifications(decoded.uuid);
                  res.status(200).json({ notifications });
            } catch {
                  res.status(400).send('Error');
            }
      });
};

const createNotification = (req, res) => {
      const token = req.body.authToken || req.query.authToken;
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
            NotificationModel.createNotification(decoded.uuid, req.body)
      });
};

const unseenNotificationsNb = (req, res) => {
      const token = req.body.authToken || req.query.authToken;
      jwt.verify(token, config.jwtSecret, async (err, decoded) => {
            try {
                  const nb = await NotificationModel.unseenNotificationsNb(decoded.uuid);
                  res.status(200).json({ nb });
            } catch {
                  res.status(400).send('Error');
            }
      });
};

module.exports = {
      getNotifications,
      createNotification,
      unseenNotificationsNb,
};
