const driver = require('./database.js');

const session = driver.session();

async function runLikesSeed() {
    const userCountRes = await session.run(`
        MATCH (u:User)
        RETURN count(u) AS userCount 
    `)
    const maxId = userCountRes.records[0].get(`userCount`);
    const likesByUser = 10
    const relCountRes = await session.run(`
        MATCH (n)
        OPTIONAL MATCH (n)-[r:LIKED]-()
        DELETE r
        RETURN count(r) AS relCount
    `)
    console.log(`${relCountRes.records[0].get(`relCount`)} likes relationships erased.`);
    console.log('Seeding likes...')
    for (i = 0; i < maxId; i++) {
        const invalidIds = [i];
        for (j = 0; j < likesByUser; j++) {
            let randomId = Math.floor(Math.random() * maxId);
            while (invalidIds.includes(randomId)) {
                randomId = Math.floor(Math.random() * maxId);
            }
            invalidIds.push(randomId);
            await session.run(`
                MATCH (randomUser:User {seedId: $randomSeedId}), (user:User {seedId: $userSeedId})
                CREATE (randomUser)-[r:LIKED]->(user)
                SET r.timestamp = timestamp()
            `, {
                randomSeedId: randomId,
                userSeedId: i,   
            })
        }
    }
    const likesCountRes = await session.run(`
        MATCH (n)
        OPTIONAL MATCH (n)-[r:LIKED]-()
        RETURN count(r) AS likesCount
    `)
    console.log(`${likesCountRes.records[0].get(`likesCount`)} likes generated for ${maxId} users.`)
    session.close();
}

async function runVisitSeed() {
    const userCountRes = await session.run(`
        MATCH (u:User)
        RETURN count(u) AS userCount 
    `)
    const maxId = userCountRes.records[0].get(`userCount`);
    const visitByUser = 10
    const relCountRes = await session.run(`
        MATCH (n)
        OPTIONAL MATCH (n)-[r:VISIT]-()
        DELETE r
        RETURN count(r) AS relCount
    `)
    console.log(`${relCountRes.records[0].get(`relCount`)} visit relationships erased.`);
    console.log('Seeding visits...')
    for (i = 0; i < maxId; i++) {
        const invalidIds = [i];
        for (j = 0; j < visitByUser; j++) {
            let randomId = Math.floor(Math.random() * maxId);
            while (invalidIds.includes(randomId)) {
                randomId = Math.floor(Math.random() * maxId);
            }
            invalidIds.push(randomId);
            await session.run(`
                MATCH (randomUser:User {seedId: $randomSeedId}), (user:User {seedId: $userSeedId})
                CREATE (randomUser)-[r:VISIT]->(user)
                SET r.timestamp = timestamp()
            `, {
                randomSeedId: randomId,
                userSeedId: i,   
            })
        }
    }
    const visitCountRes = await session.run(`
        MATCH (n)
        OPTIONAL MATCH (n)-[r:VISIT]-()
        RETURN count(r) AS visitCount
    `)
    console.log(`${visitCountRes.records[0].get(`visitCount`)} visits generated for ${maxId} users.`)
    session.close();
}

try {
    runLikesSeed();
    runVisitSeed();
} catch(err) {
    console.log(err);
}