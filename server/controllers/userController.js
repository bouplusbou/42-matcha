const User = require('../models/User')

const allUsers = (req, res) => { 
      User.getUsers()
            .then( users => { res.json({message : "List all users", data: users}) })
            .catch( error => { console.log(error) })
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
            .then( users => { res.json({message : "Search through users", data: users}) })
            .catch( error => { console.log(error) })
}

const oneUser = (req, res) => {
      User.getUser(req.params.id_user)
            .then( user => { res.json({message : "Info for one user", data: user}) })
            .catch( error => { console.log(error) })
}

module.exports = {
      allUsers,
      createUser,
      searchUsers,
      oneUser
}