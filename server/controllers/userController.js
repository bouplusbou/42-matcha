const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');

const createUser = (req, res) => {
      const emailIsOK = email => {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase());
      };
      const firstNameIsOK = firstName => {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]{3,15}$/;
            return regex.test(String(firstName));
      };
      const lastNameIsOK = lastName => {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,15}$/;
            return regex.test(String(lastName));
      };
      const usernameIsOK = username => {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{5,10}$/;
            return regex.test(String(username));
      };
      const passwordIsOK = password => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
            return regex.test(String(password));
      };
      
      const newUserIsOK = async (email, firstName, lastName, username, password) => {
            const helpers = {
                  errors: [],
                  taken: [],
            };
            if (!emailIsOK(email)) { helpers.errors.push('email') };
            if (!firstNameIsOK(firstName)) { helpers.errors.push('firstName') };
            if (!lastNameIsOK(lastName)) { helpers.errors.push('lastName') };
            if (!usernameIsOK(username)) { helpers.errors.push('username') };
            if (!passwordIsOK(password)) { helpers.errors.push('password') };
            const emailExists = await User.emailExists(email);;
            if (emailExists) { helpers.taken.push('email') };
            const usernameExists = await User.usernameExists(username);
            if (usernameExists) { helpers.taken.push('username') };
            return helpers;
      };

      const manageNewUser = async (email, firstName, lastName, username, password) => {
            const helpers = await newUserIsOK(email, firstName, lastName, username, password);
            if (helpers.errors.length !== 0 || helpers.taken.length !== 0) {
                  res.status(400).json(helpers);
                  return;
            }
            await User.createUser(email, firstName, lastName, username, password);
            res.status(200).json({ message: 'User created' });
      };
      const { email, firstName, lastName, username, password } = req.body;
      manageNewUser(email, firstName, lastName, username, password);
};

const oneUser = (req, res) => {
      console.log(req.params.username)
      User.userFromUsername(req.params.username)
            .then(user => { res.json({message : "Info for one user", data: user}) })
            .catch(err => { console.log(err) })
}

const getUuid = async (req, res) => {
      const token = req.body.authToken || req.query.authToken;
      const uuid = await jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) res.status(401).send('Unauthorized: Invalid token');
            return decoded.uuid;
      });
      return uuid;
}

const getProfile = async (req, res) => {
      const uuid = await getUuid(req, res);
      if (uuid) {
            User.getProfile(uuid)
                  .then(profile => { res.json({profile: profile})})
                  .catch(err => { console.log(err)})
      }
}

const updateProfile = async (req, res) => {
      const uuid = await getUuid(req, res);
      console.log(req.body);
      if (uuid) {
            User.updateProfile(uuid, req.body)
            .catch(err => { console.log(err) })
      }
}

const updateRelationship = (req, res) => {
      const token = req.body.authToken || req.query.authToken;
      jwt.verify(token, config.jwtSecret, async (err, decoded) => {
            User.updateRelationship(decoded.uuid, req.body)
                  .then(users => { res.json({usersArr: users}) })
                  .catch(err => { console.log(err) })
      });
}

const addTag = async (req, res) => {
      const uuid = await getUuid(req, res);
      if (uuid) {
            User.addTag(uuid, req.body)
                  .then(() => { res.json({message: "ca marche"})})
                  .catch(err => { console.log(err)})
      }
}

const removeTag = async (req, res) => {
      const uuid = await getUuid(req, res);
      if (uuid) {
            User.removeTag(uuid, req.body)
                  .then(() => { res.json({message: "ca marche"})})
                  .catch(err => { console.log(err)})
      }
}


module.exports = {
      // allUsers,
      createUser,
      getProfile,
      updateProfile,
      addTag,
      removeTag,
      // searchUsers,
      // oneUser,
      // profile,
      // uploadPhoto,
}