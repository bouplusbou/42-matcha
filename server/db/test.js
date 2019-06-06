
const db = require('./database.js')

async function seedUsersTags(id_user, id_tag) { 
    const text = `
      INSERT INTO users_tags (id_user, id_tag) 
      VALUES ($1, $2) `
    const values = [id_user, id_tag]
    try {
      const res = await db.pool.query(text, values)
      console.log(`User ${id_user} get assigned tag '${id_tag}'`)
    } catch(err) {
      console.log(err.stack)
    }
  }

  for (i = 1; i < 1000; i++) {
    seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
    seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
    seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
    seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
    seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
  }
