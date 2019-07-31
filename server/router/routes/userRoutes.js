const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const { allUsers, createUser, searchUsers, suggestedUsers, likeDislike, filtersMinMax } = require('../../controllers/userController');
const upload = require('../../middlewares/multer');

router.route('/')
      .get(authenticate, (req, res) => { allUsers(req, res); })
      .post((req, res) => { createUser(req, res); })
      .put(authenticate, (req, res) => { res.json({message : "Update a user"}) })
      .delete(authenticate, (req, res) => { res.json({message : "Delete a user"}) });

router.route('/search')
      .post(authenticate, (req, res) => { searchUsers(req, res); });

router.route('/matcher')
      .post(authenticate, (req, res) => { suggestedUsers(req, res); });

router.route('/likeDislike')
      .post(authenticate, (req, res) => { likeDislike(req, res); });

router.route('/filtersMinMax')
      .get(authenticate, (req, res) => { filtersMinMax(req, res); });
      
// router.route('/profile')
//       .get(authenticate, (req, res) => { profile(req, res); });

// router.route('/uploadPhoto')
//       .post(authenticate, upload.single('userPhoto'), (req, res, next) => { uploadPhoto(req, res); });

// routes order is important, first come first serve
// with params, put it last
router.route('/:id_user')
      .get(authenticate, (req, res) => { oneUser(req, res); });

module.exports = router;
