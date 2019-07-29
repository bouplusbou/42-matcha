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

async function searchUsers(uuid, sortingChoice, filterAge, filterScore, filterTags) { 
  const sorting = { 
    'Closest': 'ORDER BY dist_city',
    'Farthest': 'ORDER BY dist_city DESC',
    'Youngest': 'ORDER BY age',
    'Oldest': 'ORDER BY age',
    'Most famous': 'ORDER BY score DESC',
    'Least famous': 'ORDER BY score',
  };
  try {
    const res = await session.run(`
    MATCH (me:User {uuid: $uuid}), (u:User)
    MATCH (u)-[:TAGGED]->(t:Tag)
    WHERE NOT (me = u) 
    AND u.gender IN me.lookingFor
    AND me.gender IN u.lookingFor
    WITH me, u, t, point({latitude: me.latLng[0], longitude: me.latLng[1]}) AS p1, point({latitude: u.latLng[0], longitude: u.latLng[1]}) AS p2, duration.between(date(u.birthDate),date()).years AS age
    WHERE ( $ageMin <= age <= $ageMax)
    RETURN u.username AS username, 
      age,
      u.gender AS gender,
      u.city AS city,
      u.score AS score,
      u.orientation AS orientation,
      u.photos AS photos,
      u.avatarIndex AS avatarIndex,
      collect(DISTINCT t.tag) AS tags, 
      distance(p1,p2) AS dist_city
    ${sorting[sortingChoice]}
    LIMIT 20
    `, { 
      uuid: uuid,
      ageMin: filterAge[0],
      ageMax: filterAge[1],
    });
    session.close();
    const users = res.records.map(record => {
      const username = record.get('username');
      const gender = record.get('gender');
      const age = record.get('age');
      const city = record.get('city');
      const score = record.get('score');
      const orientation = record.get('orientation');
      const avatarIndex = record.get('avatarIndex');
      const photos = record.get('photos');
      const photo = photos[avatarIndex];
      const tags = record.get('tags');
      return { username, gender, age, city, score, orientation, photo, tags }
    });
    // console.log(users);
    return users;
  } catch(err) { console.log(err.stack) }
}

async function filtersMinMax() { 
  try {
    const res = await session.run(`
      MATCH (u:User)
      WITH u, duration.between(date(u.birthDate),date()).years AS age
      RETURN min(age) AS ageMin, max(age) AS ageMax, min(u.score) AS scoreMin, max(u.score) AS scoreMax
    `);
    session.close();
    const ageMin = res.records[0].get('ageMin').low;
    const ageMax = res.records[0].get('ageMax').low;
    const scoreMin = res.records[0].get('scoreMin');
    const scoreMax = res.records[0].get('scoreMax');
    return { age: [ageMin, ageMax], score: [scoreMin, scoreMax] };
  } catch(err) { console.log(err.stack) }
}



module.exports = {
  createUser,
  usernameExists,
  emailExists,
  uuidExists,
  userFromUsername,
  searchUsers,
  filtersMinMax,
  // getUsers,
  // getUser,
  // getProfile,
}



// async function searchUsers(uuid, sortingChoice, filterAge, filterScore, filterTags) { 
//   sortingChoice
//   // console.log(uuid);
//   try {
//     const res = await session.run(`
//     MATCH (me:User {uuid: $uuid}), (u:User)
//     MATCH (u)-[:TAGGED]->(t:Tag)
//     WHERE NOT (me = u) 
//     AND u.gender IN me.lookingFor
//     AND me.gender IN u.lookingFor
//     WITH me, u, t, point({latitude: me.latLng[0], longitude: me.latLng[1]}) AS p1, point({latitude: u.latLng[0], longitude: u.latLng[1]}) AS p2
//     RETURN u.username AS username, 
//       u.birthDate AS birthDate,
//       u.gender AS gender,
//       u.city AS city,
//       u.score AS score,
//       u.orientation AS orientation,
//       u.photos AS photos,
//       u.avatarIndex AS avatarIndex,
//       collect(DISTINCT t.tag) AS tags, 
//       distance(p1,p2) AS dist_city
//     ORDER BY dist_city
//     `, { uuid: uuid });
//     session.close();
//     const users = res.records.map(record => {
//       const username = record.get('username');
//       const gender = record.get('gender');
//       const birthDate = record.get('birthDate');
//       var today = new Date();
//       var birth = new Date(birthDate);
//       let age = today.getFullYear() - birth.getFullYear();
//       let m = today.getMonth() - birth.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
//       const city = record.get('city');
//       const score = record.get('score');
//       const orientation = record.get('orientation');
//       const avatarIndex = record.get('avatarIndex');
//       const photos = record.get('photos');
//       const photo = photos[avatarIndex];
//       const tags = record.get('tags');
//       return { username, gender, birthDate, age, city, score, orientation, photo, tags }
//     });
//     // console.log(users);
//     return users;
//   } catch(err) { console.log(err.stack) }
// }