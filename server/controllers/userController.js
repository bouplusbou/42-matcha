const User = require('../models/User')
const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');

const allUsers = (req, res) => { 
      User.getUsers()
            .then(users => { res.json({message : "List all users", data: users}) })
            .catch(err => { console.log(err) })
}

const createUser = (req, res) => {
      const emailIsOK = email => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase())
      }
      const firstNameIsOK = firstName => {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]{3,15}$/
            return regex.test(String(firstName))
      }
      const lastNameIsOK = lastName => {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,15}$/
            return regex.test(String(lastName))
      }
      const usernameIsOK = username => {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{5,10}$/
            return regex.test(String(username))
      }
      const passwordIsOK = password => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
            return regex.test(String(password))
      }
      
      const newUserIsOK = async (email, firstName, lastName, username, password) => {
            const helpers = {}
            if (!emailIsOK(email)) { helpers.emailKO = true }
            if (!firstNameIsOK(firstName)) { helpers.firstNameKO = true }
            if (!lastNameIsOK(lastName)) { helpers.lastNameKO = true }
            if (!usernameIsOK(username)) { helpers.usernameKO = true }
            if (!passwordIsOK(password)) { helpers.passwordKO = true }
            const emailUser = await User.emailExists(email)
            if (emailUser) { helpers.emailTaken = true }
            const usernameUser = await User.usernameExists(username)
            if (usernameUser) { helpers.usernameTaken = true }
            return helpers
      }

      const manageNewUser = async (email, firstName, lastName, username, password) => {
            const helpers = await newUserIsOK(email, firstName, lastName, username, password)
            if (helpers.emailKO
                  || helpers.firstNameKO
                  || helpers.lastNameKO
                  || helpers.usernameKO
                  || helpers.passwordKO
                  || helpers.usernameTaken
                  || helpers.emailTaken) {
                    res.status(400).json(helpers)
                    return
            }
            const user = await User.createUser(email, firstName, lastName, username, password)
            res.status(200).json({ message: 'User created' })
      }
      const { email, firstName, lastName, username, password } = req.body
      manageNewUser(email, firstName, lastName, username, password)
}

const searchUsers = (req, res) => {
      const { age, fame, latlng, tags } = req.body
      User.getUsers(age, fame, latlng, tags)
            .then(users => { res.json({message : "Search through users", data: users}) })
            .catch(err => { console.log(err) })
}

const oneUser = (req, res) => {
      User.getUser(req.params.id_user)
            .then(user => { res.json({message : "Info for one user", data: user}) })
            .catch(err => { console.log(err) })
}

const profile = async (req, res) => {
      const token = req.body.authToken || req.query.authToken;
      const uuid = await jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) res.status(401).send('Unauthorized: Invalid token');
            return decoded.uuid;
      });
      if (uuid) {
            User.getProfile(uuid)
                  .then(user => { res.json({message : "Profile", data: user}) })
                  .catch(err => { console.log(err) })
      }
}

const uploadPhoto = async (req, res) => {
      const token = req.body.authToken || req.query.authToken;
      const uuid = await jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) res.status(401).send('Unauthorized: Invalid token');
            return decoded.uuid;
      });
      if (uuid) {
            console.log({uuid})
            console.log(req.file);
      }
}

module.exports = {
      allUsers,
      createUser,
      searchUsers,
      oneUser,
      profile,
      uploadPhoto,
}