const express = require('express');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const { allUsers, createUser, searchUsers, getProfile, profile, uploadPhoto, updateProfile, addTag, removeTag } = require('../../controllers/userController');
const upload = require('../../middlewares/multer');

router.route('/')
      .get(authenticate, (req, res) => { allUsers(req, res); })
      .post((req, res) => { createUser(req, res); })
      .put(authenticate, (req, res) => { res.json({message : "Update a user"}) })
      .delete(authenticate, (req, res) => { res.json({message : "Delete a user"}) });

router.route('/search')
      .post(authenticate, (req, res) => { searchUsers(req, res); });
      
router.route('/profile')
      .get(authenticate, (req, res) => { profile(req, res); });

router.route('/uploadPhoto')
      .post(authenticate, upload.single('userPhoto'), (req, res, next) => { uploadPhoto(req, res); });

// routes order is important, first come first serve
// with params, put it last
router.route('/getProfile')
      .get(authenticate, (req, res) => { getProfile(req, res) })

router.route(`/updateProfile`)
      .post(authenticate, (req, res) => { updateProfile(req, res) })

router.route('/updateRelationship')
      .post(authenticate, (req, res) => { updateRelationship(req, res); });

router.route(`/addTag`)
      .post(authenticate, (req, res) => { addTag(req, res); })

router.route(`/removeTag`)
      .delete(authenticate, (req, res) => { removeTag(req, res); })

module.exports = router;