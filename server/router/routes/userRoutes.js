const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const { allUsers, createUser, searchUsers, suggestedUsers, updateRelationship, filtersMinMax } = require('../../controllers/userController');

router.route('/')
      .get(authenticate, (req, res) => { allUsers(req, res); })
      .post((req, res) => { createUser(req, res); })

router.route('/search')
      .post(authenticate, (req, res) => { searchUsers(req, res); });

router.route('/matcher')
      .post(authenticate, (req, res) => { suggestedUsers(req, res); });

router.route('/updateRelationship')
      .post(authenticate, (req, res) => { updateRelationship(req, res); });

router.route('/filtersMinMax')
      .get(authenticate, (req, res) => { filtersMinMax(req, res); });

module.exports = router;
