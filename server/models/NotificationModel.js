const driver = require('../db/database.js');
const session = driver.session();

async function visited(uuid, { visitedUsername }) { 
  try {
    const res = await session.run(`
      MATCH (me:User {uuid: $uuid}), (user:User {username: $visitedUsername})
      CREATE (me)-[r:VISITED]->(user)
      SET r.timestamp = timestamp(), r.status = 'unread'
      RETURN me, user
    `, { 
      uuid: uuid,
      visitedUsername: visitedUsername,
    });
    session.close();
  } catch(err) { console.log(err) }
}

module.exports = {
  visited,
}
 