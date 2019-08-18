const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');
const sendEmail = require('../actions/email.js');
const Log = require(`../tools/Log`);

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
      const regex = /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{6,50}$/;
      return regex.test(String(password));
};

const createUser = (req, res) => {
      try {
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
                  const emailExists = await UserModel.emailExists(email);;
                  if (emailExists) { helpers.taken.push('email') };
                  const usernameExists = await UserModel.usernameExists(username);
                  if (usernameExists) { helpers.taken.push('username') };
                  return helpers;
            };
            
            const manageNewUser = async ({ email, firstName, lastName, username, password, city, latLng }) => {
                  const helpers = await newUserIsOK(email, firstName, lastName, username, password);
                  if (helpers.errors.length !== 0 || helpers.taken.length !== 0) {
                        res.status(400).json(helpers);
                        return;
                  }
                  await UserModel.createUser(email, firstName, lastName, username, password, city, latLng);
                  res.status(200).json({ message: 'User created' });
            };
            manageNewUser(req.body);
      } catch (error) { Log.error(error, `createUser`, __filename) }
};

const getUuidFromToken = async (req, res) => {
      try {
            const token = req.body.authToken || req.query.authToken;
            const uuid = await jwt.verify(token, config.jwtSecret, (err, decoded) => {
                  if (err) res.status(401).send('Unauthorized: Invalid token');
                  return decoded.uuid;
            });
            return uuid;
      } catch (error) { Log.error(error, `getUuidFromToken`, __filename) }
}
    
const getCurrentProfile = async (req, res) => {
      try {
            const uuid = await getUuidFromToken(req, res);
            if (uuid) {
                  const profile = await UserModel.getProfile(uuid);
                  profile.account = false;
                  profile.visitedHistoric = await UserModel.getHistoric(uuid, "VISITED");
                  profile.likedHistoric = await UserModel.getHistoric(uuid, "LIKED");
                  profile.account = true;
                  res.json({profile: profile})
            }
      } catch (error) { Log.error(error, `getCurrentProfile`, __filename) }
}

const getProfile = async (req, res) => {
      try {
            const uuid = await getUuidFromToken(req, res);
            if (uuid) {
                  const reqUser = await UserModel.getUserByUsername(req.params.username);
                  const profile = await UserModel.getProfile(reqUser.uuid);
                  profile.account = false;
                  if (uuid === reqUser.uuid) {
                        profile.visitedHistoric = await UserModel.getHistoric(uuid, "VISITED");
                        profile.likedHistoric = await UserModel.getHistoric(uuid, "LIKED");
                        profile.account = true;
                  }
                  res.json({profile: profile})
            }
      } catch (error) { Log.error(error, `getProfile`, __filename) }
}

const updateProfile = async (req, res) => {
      try {
            const uuid = await getUuidFromToken(req, res);
            if (uuid) {
                  await UserModel.updateProfile(uuid, req.body);
                  res.status(200).json({ message: 'Profile updated.' });
            }
      } catch (error) { Log.error(error, `updateProfile`, __filename) }
}

const addTag = async (req, res) => {
      try {
            const uuid = await getUuidFromToken(req, res);
            if (uuid) {
                  await UserModel.addTag(uuid, req.body);
                  res.json({message: "Tag relationship created."});
            }
      } catch (error) { Log.error(error, `addTag`, __filename) }
}

const confirmUser = async (req, res) => {
      try {
            const uuid = await UserModel.getUuidByHash(req.body);
            if (uuid !== null) {
                  await UserModel.confirmUser(uuid)
                  res.status(200).json({ message: 'Confirmation is set in db' });
            } else { res.status(400).json({ message: 'Hash is not OK' }) }
      } catch (error) { Log.error(error, `confirmUser`, __filename) }
};

const resetPasswordEmail = (req, res) => {
      try {
            const { email } = req.body;
            UserModel.resetPasswordEmail(email)
                  .then(hash => {res.status(200).json({ message: 'Reset request treated' })})
                  .catch(err => res.status(200).json({ message: 'Reset request treated' }))
      } catch (error) { Log.error(error, `resetPasswordEmail`, __filename) }
}

const removeTag = async (req, res) => {
      try {
            const uuid = await getUuidFromToken(req, res);
            if (uuid) {
                  await UserModel.removeTag(uuid, req.body)
                  res.status(200).json({ message: 'Tag removed.' });
            }
      } catch (error) { Log.error(error, `removeTag`, __filename) }
}

const createRelationship = async (req, res) => {
      try {
            const uuid = await getUuidFromToken(req, res);
            const targetUser = await UserModel.getUserByUsername(req.body.username);
            await UserModel.createRelationship(req.body.choice, uuid, targetUser.uuid);
            res.status(200).json({ message: `${req.body.choice} relationship created.`})
      } catch (error) { Log.error(error, `createRelationship`, __filename) }
}

const deleteRelationship = async (req, res) => {
      try {
            const uuid = await getUuidFromToken(req, res);
            const targetUser = await UserModel.getUserByUsername(req.body.username);
            await UserModel.deleteRelationship(req.body.choice, uuid, targetUser.uuid);
            res.status(200).json({ message: `${req.body.choice} relationship deleted.`})
      } catch (error) { Log.error(error, `deleteRelationship`, __filename) }
}

module.exports = {
      createUser,
      getProfile,
      updateProfile,
      addTag,
      removeTag,
      confirmUser,
      resetPasswordEmail,
      getCurrentProfile,
      createRelationship,
      deleteRelationship
}