const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const { login } = require('../../controllers/authController');

router.route('/')
      .get(authenticate, (req,res) => { res.sendStatus(200) })
      .post((req,res) => { login(req, res) })

module.exports = router;