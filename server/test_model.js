const neo4j = require('neo4j-driver').v1;

// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const driver = neo4j.driver(
    'bolt://192.168.99.100:7687/',
    neo4j.auth.basic('neo4j', 'whiterabbit')
)
const session = driver.session();

const resultPromise = session.run(
    `MATCH (n:Person) RETURN n LIMIT 25`);

resultPromise.then(result => {
// session.close();
// const singleRecord = result.records[0];
// const node = singleRecord.get(0);
// console.log(node.properties.username);
const allRecords = result.records;

console.log(allRecords.length);
// on application exit:
// driver.close();
});
