const express = require('express')
const router = express.Router()
const { allTags } = require('../../controllers/tagController')

router.route('/')
      .post((req,res) => { allTags(req, res) })

module.exports = router