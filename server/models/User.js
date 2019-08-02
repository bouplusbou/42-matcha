const bcrypt = require('bcrypt');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const driver = require('../db/database.js');
const sendEmail = require('../actions/email.js');
const session = driver.session();

async function createUser(email, firstName, lastName, username, password, city, latLng ) {
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
          fame: $fame,
          city: $city,
          latLng: $latLng })
      `, {
          uuid: uuid,
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: hashedPassword,
          confirmed: false,
          hash: hash,
          fame: 100,
          city: city,
          latLng: latLng,
      });
      session.close();
      sendEmail('confirmation', email, hash);
    } catch(err) { console.log(err) }
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
  } catch(err) { console.log(err) }
}

async function updateProfile(uuid, req) {
  try {
    await session.run(`
      MATCH (u:User {uuid: $uuid})
      ${req.username ? `SET u.username = $username` : ""}
      ${req.firstName ? `SET u.firstName = $firstName` : ""}
      ${req.lastName ? `SET u.lastName = $lastName` : ""}
      ${req.gender ? `SET u.gender = $gender` : ""}
      ${req.age ? `SET u.age = $age` : ""}
      ${req.orientation ? `SET u.orientation = $orientation` : ""}
      ${req.bio ? `SET u.bio = $bio` : ""}
      ${req.city ? `SET u.city = $city` : ""}
      ${req.latLng ? `SET u.letLng = $latLng` : ""}
    `, { req });
    session.close();
  } catch (err) { console.log(err.stack) }
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
  } catch(err) { console.log(err) }
}

async function userFromUsername(username) { 
  try {
    const res = await session.run(`
      MATCH (u:User)
      WHERE u.username = $username
      RETURN u.password AS password, u.uuid AS uuid, u.confirmed AS confirmed
    `, { username: username });
    session.close();
    if (res.records[0] !== undefined) {
      const password = res.records[0].get('password');
      const uuid = res.records[0].get('uuid');
      const confirmed = res.records[0].get('confirmed');
      const user = { password, uuid, confirmed };
      return user;
    } else {
      return null;
    }
  } catch(err) { console.log(err) }
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
  } catch(err) { console.log(err) }
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
      u.lastConnection AS lastConnection,
      u.city AS city,
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
    const lastConnection = res.records[0].get('lastConnection');
    const city = res.records[0].get('city');
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
      lastConnection,
      city
    }
  } catch(err) { console.log(err.stack)};
}

async function searchUsers(uuid, { sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags, offset }) { 
  // console.log(uuid);
  const sorting = { 
    'Closest': 'ORDER BY dist_city',
    'Farthest': 'ORDER BY dist_city DESC',
    'Youngest': 'ORDER BY age',
    'Oldest': 'ORDER BY age',
    'Most famous': 'ORDER BY score DESC',
    'Least famous': 'ORDER BY score',
  };

  const selectedTags = filterTags.length !== 0 ? filterTags.map( tag => tag.label ) : null;

  try {
    const res = await session.run(`
    MATCH (me:User {uuid: $uuid}), (u:User)
    MATCH (u)-[:TAGGED]->(t:Tag)
    MATCH (u)-[:TAGGED]->(t2:Tag)
    WHERE NOT (me = u) 
    AND u.gender IN me.lookingFor
    AND me.gender IN u.lookingFor
    AND ( $scoreMin <= u.score <= $scoreMax)
    ${selectedTags ? 'AND t2.tag in $selectedTags' : ''}
    WITH me, u, t,
      point({latitude: me.latLng[0], longitude: me.latLng[1]}) AS p1, 
      point({latitude: u.latLng[0], longitude: u.latLng[1]}) AS p2,
      ${filterLatLng ? ' point({latitude: $lat, longitude: $lng}) AS p3, ' : ''}
      duration.between(date(u.birthDate),date()).years AS age
    WITH me, u, t, age, p1, p2
    ${filterLatLng ? ' , distance(p2,p3) AS city_range' : ''}
    WHERE ( $ageMin <= age <= $ageMax)
    ${filterLatLng ? ' AND city_range <= $cityDistance' : ''}
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
    SKIP $offset
    LIMIT 20
    `, { 
      uuid: uuid,
      scoreMin: filterScore[0],
      scoreMax: filterScore[1],
      ageMin: filterAge[0],
      ageMax: filterAge[1],
      lat: filterLatLng ? filterLatLng[0] : 0,
      lng: filterLatLng ? filterLatLng[1] : 0,
      cityDistance: filterDistance * 1000,
      selectedTags: selectedTags,
      offset: offset,
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
    return users;
  } catch(err) { console.log(err) }
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
  } catch(err) { console.log(err) }
}



async function suggestedUsers(uuid, { sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags }) { 
  // console.log(uuid);
  const sorting = { 
    'Closest': 'ORDER BY dist_city',
    'Farthest': 'ORDER BY dist_city DESC',
    'Youngest': 'ORDER BY age',
    'Oldest': 'ORDER BY age',
    'Most famous': 'ORDER BY score DESC',
    'Least famous': 'ORDER BY score',
  };

  const selectedTags = filterTags.length !== 0 ? filterTags.map( tag => tag.label ) : null;

  try {
    const res = await session.run(`
    MATCH (me:User {uuid: $uuid}), (u:User)
    MATCH (u)-[:TAGGED]->(t:Tag)
    MATCH (u)-[:TAGGED]->(t2:Tag)
    WHERE NOT (me = u) 
    AND NOT (me)-[:DISLIKED]->(u)
    AND NOT (me)-[:LIKED]->(u)
    AND u.gender IN me.lookingFor
    AND me.gender IN u.lookingFor
    AND ( $scoreMin <= u.score <= $scoreMax)
    ${selectedTags ? 'AND t2.tag in $selectedTags' : ''}
    WITH me, u, t,
      point({latitude: me.latLng[0], longitude: me.latLng[1]}) AS p1, 
      point({latitude: u.latLng[0], longitude: u.latLng[1]}) AS p2,
      ${filterLatLng ? ' point({latitude: $lat, longitude: $lng}) AS p3, ' : ''}
      duration.between(date(u.birthDate),date()).years AS age
    WITH me, u, t, age, p1, p2
    ${filterLatLng ? ' , distance(p2,p3) AS city_range' : ''}
    WHERE ($ageMin <= age <= $ageMax)
    ${filterLatLng ? ' AND city_range <= $cityDistance' : ''}
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
    LIMIT 1
    `, { 
      uuid: uuid,
      scoreMin: filterScore[0],
      scoreMax: filterScore[1],
      ageMin: filterAge[0],
      ageMax: filterAge[1],
      lat: filterLatLng ? filterLatLng[0] : 0,
      lng: filterLatLng ? filterLatLng[1] : 0,
      cityDistance: filterDistance * 1000,
      selectedTags: selectedTags,
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
    return users;
  } catch(err) { console.log(err) }
}

async function updateRelationship(uuid, { choice, username }) { 
  const relation = {
    'like': 'CREATE (me)-[r:LIKED]->(other)',
    'dislike': 'CREATE (me)-[r:DISLIKED]->(other)'
  }
  try {
    const res = await session.run(`
      MATCH (me:User {uuid: $uuid}), (other:User {username: $username})
      ${relation[choice]}
      SET r.timestamp = timestamp()
    `, { 
      uuid: uuid,
      username: username,
    });
    session.close();
  } catch(err) { console.log(err.stack) }
}

async function addTag(uuid, req) {
  try {
    await session.run(`
    MATCH (u:User {uuid: $uuid}), (t:Tag {tag: $tag})
    CREATE (u)-[r:TAGGED]->(t)
    `, {
      uuid: uuid,
      tag: req.tag
    });
    session.close();
  } catch(err) { console.log(err.stack) }
}

async function removeTag(uuid, req) {
  try {
    await session.run(`
      MATCH (u:User {uuid: $uuid})-[r:TAGGED]->(t:Tag {tag: $tag})
      DELETE r
    `, {
      uuid: uuid,
      tag: req.tag,
    });
    session.close();
  } catch(err) { console.log(err) }
}

async function uuidFromHash({ hash }) { 
  try {
    const res = await session.run(`
      MATCH (me:User {hash: $hash})
      RETURN me.uuid AS uuid
    `, { hash: hash });
    session.close();
    if (res.records[0] === undefined) return null;
    const uuid = res.records[0].get('uuid');
    return uuid;
  } catch(err) { console.log(err) }
}

async function confirmation(uuid) { 
  try {
    const res = await session.run(`
      MATCH (me:User {uuid: $uuid})
      SET me.confirmed = true
    `, { uuid: uuid });
    session.close();
  } catch(err) { console.log(err) }
}

async function resetPasswordEmail(email) { 
  console.log(email);
  try {
    const res = await session.run(`
      MATCH (u:User)
      WHERE u.email = $email
      RETURN u.hash AS hash
    `, { email: email });
    session.close();
    if (res.records[0] === undefined) return null;
    const hash = res.records[0].get('hash');
    sendEmail('resetPassword', email, hash);
    return;
  } catch(err) { console.log(err) }
}

module.exports = {
  createUser,
  usernameExists,
  emailExists,
  uuidExists,
  userFromUsername,
  getProfile,
  updateProfile,
  addTag,
  removeTag,
  searchUsers,
  suggestedUsers,
  updateRelationship,
  filtersMinMax,
  uuidFromHash,
  confirmation,
  resetPasswordEmail,
}
