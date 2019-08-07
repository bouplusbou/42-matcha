const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const authController = require('../../controllers/authController');
const userController = require('../../controllers/userController');

router.route('/')
      .get(authenticate, (req,res) => { userController.usernameFromUuid(req, res) })
      .post((req,res) => { authController.login(req, res) })
      // .get(authenticate, (req,res) => { res.sendStatus(200) })

module.exports = router;