const driver = require('../db/database.js');
const session = driver.session();

async function allTags() { 
  try {
    const res = await session.run(`
      MATCH (t:Tag) 
      RETURN collect(DISTINCT t.tag) AS tags
    `);
    session.close();
    return res.records[0].get('tags');
  } catch(err) { console.log(err.stack) }
}

module.exports = {
  allTags,
}