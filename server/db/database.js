const Pool = require('pg').Pool

const pool = new Pool({
    user: 'baptiste',
    host: '192.168.99.100',
    database: 'matcha',
    password: 'password',
    port: 5432
    })

module.exports = {
    pool,
  }