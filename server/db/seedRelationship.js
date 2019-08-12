const driver = require('./database.js');

const session = driver.session();

const getUserCount = async () => {
    const userCountRes = await session.run(`
        MATCH (u:User)
        RETURN count(u) AS userCount 
    `)
    return userCountRes.records[0].get(`userCount`);
}

const deleteAllRelationships = async (relationship) => {
    const relCountRes = await session.run(`
        MATCH (n)
        OPTIONAL MATCH (n)-[r:${relationship}]-()
        DELETE r
        RETURN count(r) AS relCount
    `)
    console.log(`${relCountRes.records[0].get(`relCount`)} [:${relationship}] relationship(s) erased.`);
}

async function runLikesSeed() {
    const maxId = await getUserCount();
    const likesByUser = 10
    await deleteAllRelationships("LIKED");
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
    const maxId = await getUserCount();
    const visitByUser = 10
    await deleteAllRelationships("VISIT");
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

async function isLiked(userSeedId, targetSeedId) {
    const res = await session.run(`
        MATCH (u:User { seedId: $userSeedId })-[r:LIKED]-(t:User { seedId: $targetSeedId })
        RETURN count(r) AS liked
    `, {
        userSeedId: userSeedId,
        targetSeedId: targetSeedId
    })
    const liked = res.records[0].get(`liked`);
    return liked === 1;
}

async function seedBlock() {
    const maxId = await getUserCount();
    await deleteAllRelationships("BLOCK");
    console.log('Seeding blocks...');
    for (i = 0; i < maxId; i++) {
        let randomId = Math.floor(Math.random() * maxId);
        while (i === randomId || await isLiked(i, randomId) || await isLiked(randomId, i)) {
            randomId = Math.floor(Math.random() * maxId);
        }
        await session.run(`
            MATCH (randomUser:User {seedId: $randomSeedId}), (user:User {seedId: $userSeedId})
            CREATE (randomUser)-[r:BLOCK]->(user)
            SET r.timestamp = timestamp()
        `, {
            randomSeedId: randomId,
            userSeedId: i,   
        })
        }
    const blockCountRes = await session.run(`
        MATCH (n)
        OPTIONAL MATCH (n)-[r:BLOCK]-()
        RETURN count(r) AS blockCount
    `)
    console.log(`${blockCountRes.records[0].get(`blockCount`)} block generated for ${maxId} users.`)
    session.close();
}


const main = () => {
    const argv = process.argv;
    try {
        if (!argv[2] || argv[2] === "likes")
            runLikesSeed();
        if (!argv[2] || argv[2] === "visits")
        runVisitSeed();
        if (!argv[2] || argv[2] === "blocks")
            seedBlock();
    } catch(err) {
        console.log(err);
    }
}

main();