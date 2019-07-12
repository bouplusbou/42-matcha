const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver(
    'bolt://192.168.99.100:7687/',
    neo4j.auth.basic('neo4j', 'whiterabbit')
);

module.exports = driver;

// const Pool = require('pg').Pool

// const pool = new Pool({
//     user: 'baptiste',
//     host: '192.168.99.100',
//     database: 'matcha',
//     password: 'password',
//     port: 5432
//     })

// module.exports = {
//     pool,
//   }