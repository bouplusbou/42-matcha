const db = require('../db/database.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const driver = require('../db/database.js');
const session = driver.session();

async function createUser(email, firstName, lastName, username, password) {
  await bcrypt.hash(password, 10, (error, hashedPassword) => {
      const uuid = uuidv1();
      const hash = crypto.randomBytes(20).toString('hex');
      try {
        const res = session.run(`
        CREATE (u:User {
            uuid: $uuid,
            email: $email,
            username: $username,
            firstName: $firstName,
            lastName: $lastName,
            password: $password,
            confirmed: $confirmed,
            hash: $hash,
            fame: $fame })
        `, {
            uuid: uuid,
            email: email,
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            confirmed: 1,
            hash: hash,
            fame: 100,
        });
        session.close();
    } catch(err) { console.log(err.stack) }
  })
}

async function usernameExists(username) { 
  try {
    const res = await session.run(`
      MATCH (u:User)
      WHERE u.username = $username
      RETURN u
    `, { username: username });
    session.close();
    return !!res.records[0];
  } catch(err) { console.log(err.stack) }
}

async function emailExists(email) { 
  try {
    const res = await session.run(`
      MATCH (u:User)
      WHERE u.email = $email
      RETURN u
    `, { email: email });
    session.close();
    return !!res.records[0];
  } catch(err) { console.log(err.stack) }
}

async function userFromUsername(username) { 
  try {
    const res = await session.run(`
      MATCH (u:User)
      WHERE u.username = $username
      RETURN u.password AS password, u.uuid AS uuid
    `, { username: username });
    session.close();
    const password = res.records[0].get('password');
    const uuid = res.records[0].get('uuid');
    
    const user = { password, uuid };
    return user;
  } catch(err) { console.log(err.stack) }
}

async function uuidExists(uuid) { 
  try {
    const res = await session.run(`
      MATCH (u:User)
      WHERE u.uuid = $uuid
      RETURN u
    `, { uuid: uuid });
    session.close();
    return !!res.records[0];
  } catch(err) { console.log(err.stack) }
}

async function getProfile(uuid) {
  try {
    const res = await session.run(`
      MATCH (u:User)
      MATCH (u)-[:TAGGED]->(t:Tag)
      WHERE u.uuid = $uuid
      RETURN 
      u.uuid AS uuid,
      u.username AS username,
      u.firstName AS firstName,
      u.lastName AS lastName,
      u.gender AS gender,
      u.orientation AS orientation,
      u.lookingFor AS lookingFor,
      duration.between(date(u.birthDate),date()).years AS age,
      u.bio AS bio,
      u.email AS email,
      u.photos AS photos,
      u.avatarIndex AS avatarIndex,
      u.score AS score,
      u.latLng AS latLng,
      u.likeHistory AS likeHistory,
      u.visitHistory AS visitHistory,
      collect(t.tag) AS tags
    `, {uuid: uuid});
    session.close();
    const username = res.records[0].get('username');
    const firstName = res.records[0].get('firstName');
    const lastName = res.records[0].get('lastName');
    const gender = res.records[0].get('gender');
    const orientation = res.records[0].get('orientation');
    const lookingFor = res.records[0].get('lookingFor');
    const age = res.records[0].get('age').low;
    const bio = res.records[0].get('bio');
    const email = res.records[0].get('email');
    const tags = res.records[0].get('tags');
    const photos = res.records[0].get('photos');
    const avatarIndex = res.records[0].get('avatarIndex');
    const score = res.records[0].get('score');
    const latLng = res.records[0].get('latLng');
    const likeHistory = res.records[0].get('likeHistory');
    const visitHistory = res.records[0].get('visitHistory');
    return {
      uuid,
      username,
      firstName,
      lastName,
      gender,
      orientation,
      lookingFor,
      age,
      bio,
      email,
      tags,
      photos,
      avatarIndex,
      score,
      latLng,
      likeHistory,
      visitHistory,
    }
  } catch(err) { console.log(err.stack)};
}

module.exports = {
  createUser,
  usernameExists,
  emailExists,
  uuidExists,
  userFromUsername,
  getProfile
  // getUsers,
  // getUser,
  // getProfile,
}
