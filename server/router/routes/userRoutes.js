const express = require('express')
const router = express.Router()
const authenticate = require('../../middlewares/authenticate')
const { allUsers, createUser, searchUsers, oneUser, profile, uploadPhoto } = require('../../controllers/userController')

router.route('/')
      .get(authenticate, (req,res) => { allUsers(req, res) })
      .post( (req,res) => { createUser(req, res) })
      .put( (req,res) => { res.json({message : "Update a user"}) })
      .delete( (req,res) => { res.json({message : "Delete a user"}) })

router.route('/search')
      .post(authenticate, (req,res) => { searchUsers(req, res) })

router.route('/:id_user')
      .get( (req,res) => { oneUser(req, res) })
      .put( (req,res) => { res.json({message : "Update info for user #" + req.params.id_user}) })
      .delete( (req,res) => { res.json({message : "Delete user #" + req.params.id_user}) })

router.route('/profile/:uuid')
      .get( (req,res) => { profile(req, res) })

router.route('/uploadPhoto')
      .post(authenticate, (req,res) => { uploadPhoto(req, res) })

module.exports = router