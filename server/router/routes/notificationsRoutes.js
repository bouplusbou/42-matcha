const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const NotificationsController = require('../../controllers/notificationController');

router.route('/visited')
      .post(authenticate, (req, res) => { NotificationsController.visited(req, res); })

module.exports = router;
