const db = require('../db/database.js')

async function getTags() { 
    const text = `
      SELECT *
      FROM "tags" `
    try {
      const res = await db.pool.query(text)
      return res.rows
    } catch(err) {
      console.log(err.stack)
    }
  }

  module.exports = {
    getTags
}