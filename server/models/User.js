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
      WHERE u.username = '${username}'
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
      WHERE u.email = '${email}'
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
      WHERE u.username = '${username}'
      RETURN u.password AS password, u.uuid AS uuid
    `, { username: username });
    session.close();
    const password = res.records[0].get('password');
    const uuid = res.records[0].get('uuid');
    
    const user = { password, uuid };
    return user;
    // const singleRecord = res.records[0];
    // console.log(node.properties.uuid);
    // const node = singleRecord.get(0);
    // console.log(node.properties.uuid);
    // console.log(res.records[0]);
    // return res.records[0];
  } catch(err) { console.log(err.stack) }
}

module.exports = {
  createUser,
  usernameExists,
  emailExists,
  userFromUsername,
  // getUsers,
  // getUserByUuid,
  // getUser,
  // getProfile,
}
