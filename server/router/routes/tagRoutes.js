const express = require('express');
const router = express.Router();
const { allTags } = require('../../controllers/tagController');
const authenticate = require('../../middlewares/authenticate');

router.route('/')
      .post(authenticate, (req,res) => { allTags(req, res) })

module.exports = router;