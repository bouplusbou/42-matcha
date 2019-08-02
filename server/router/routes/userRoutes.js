const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const UserController = require('../../controllers/userController');
const upload = require('../../middlewares/multer');

router.route('/')
      .post((req, res) => { UserController.createUser(req, res); })

router.route('/confirmation')
      .post((req, res) => { UserController.confirmation(req, res); });

router.route('/search')
      .post(authenticate, (req, res) => { UserController.searchUsers(req, res); });

router.route('/matcher')
      .post(authenticate, (req, res) => { UserController.suggestedUsers(req, res); });

router.route('/updateRelationship')
      .post(authenticate, (req, res) => { UserController.updateRelationship(req, res); });

router.route('/resetPasswordEmail')
      .post((req, res) => { UserController.resetPasswordEmail(req, res); });

router.route('/filtersMinMax')
      .get(authenticate, (req, res) => { UserController.filtersMinMax(req, res); });

// routes order is important, first come first serve
// with params, put it last
router.route('/getProfile')
      .get(authenticate, (req, res) => { UserController.getProfile(req, res) })

router.route(`/updateProfile`)
      .post(authenticate, (req, res) => { UserController.updateProfile(req, res) })

router.route('/updateRelationship')
      .post(authenticate, (req, res) => { UserController.updateRelationship(req, res); });

router.route(`/addTag`)
      .post(authenticate, (req, res) => { UserController.addTag(req, res); })

router.route(`/removeTag`)
      .delete(authenticate, (req, res) => { UserController.removeTag(req, res); })
module.exports = router;
