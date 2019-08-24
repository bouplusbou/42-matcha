const driver = require('../db/database.js');
const session = driver.session();

async function getDiscussions(uuid) { 
  try {
    const res = await session.run(`
      MATCH (me:User {uuid: $uuid}), (you:User), (m:Match)
      WHERE NOT (me = you) AND me.userId IN m.userIds AND you.userId IN m.userIds
      WITH me, you.username AS youUsername, you.photos AS youPhotos, you.avatarIndex AS youAvatarIndex, you.userId AS youUserId, m.matchId AS matchId
      OPTIONAL MATCH (msg:Message)
      WHERE msg.matchId = matchId AND msg.status = 'unread' AND msg.to = me.userId
      RETURN youUsername, youPhotos, youAvatarIndex, youUserId, matchId, COUNT(msg) AS unreadNb
    `, { uuid: uuid });
    session.close();
    if (res.records[0] === undefined) return null;
    const discussions = res.records.map(record => {
      const youUserId = record.get('youUserId');
      const youUsername = record.get('youUsername');
      const youPhotos = record.get('youPhotos');
      const youAvatarIndex = record.get('youAvatarIndex');
      const matchId = record.get('matchId');
      const unreadNb = record.get('unreadNb').low;
      const youAvatar = youPhotos[youAvatarIndex];
      return { youUserId, youUsername, youAvatar, matchId, unreadNb };
    });
    return discussions;
  } catch(err) { console.log(err) }
}

async function getCurrentDiscussionMessages(uuid, matchId) { 
  try {
    await session.run(`
      MATCH(me:User {uuid: $uuid}), (m:Message {matchId: $matchId, status: 'unread', to: me.userId})
      SET m.status = 'read'
    `, {
      matchId: matchId,
      uuid: uuid,
    });
    session.close();
    const res = await session.run(`
      MATCH (m:Message {matchId: $matchId}), (me:User {uuid: $uuid})
      RETURN m.message AS message,
      CASE WHEN me.userId = m.from THEN 'sent' ELSE 'received' END AS type
      ORDER BY m.dateTime ASC
    `, { 
      matchId: matchId,
      uuid: uuid,
    });
    session.close();
    if (res.records[0] === undefined) return null;
    const currentDiscussion = res.records.map(record => {
      const message = record.get('message');
      const type = record.get('type');
      return { message, type };
    });
    return currentDiscussion;
  } catch(err) { console.log(err) }
}

async function createMessage(uuid, matchId, youUserId, message) { 
  try {
    await session.run(`
      MATCH (u:User {uuid: $uuid}), (n:User {userId: $youUserId})
      CREATE (m:Message {
        matchId: $matchId,
        from: u.userId,
        to: n.userId,
        status: 'unread',
        message: $message,
        dateTime: DateTime()
      })
    `, { 
      uuid,
      youUserId,
      matchId,
      message,
    });
    session.close();
  } catch(err) { console.log(err) }
}

async function getUnreadMessagesNb(uuid) { 
  try {
    const res = await session.run(`
      MATCH (u:User {uuid: $uuid}), (m:Message)
      WHERE m.status = 'unread' AND u.userId = m.to
      RETURN COUNT(m) AS nb
    `, { uuid });
    session.close();
    if (res.records[0] === undefined) return null;
    const nb = res.records[0].get('nb').low;
    return nb;
  } catch(err) { console.log(err) }
}

async function getMatchIdsByUserId(userId) { 
  try {
    const res = await session.run(`
      MATCH (m:Match)
      WHERE $userId IN m.userIds
      RETURN m.matchId AS matchId
    `, { userId });
    session.close();
    if (res.records[0] === undefined) return null;
    const matchIds = res.records.map(record => {
      const matchId = record.get('matchId');
      return matchId;
    });
    return matchIds;
  } catch(err) { console.log(err) }
}

async function setAllAsReadByMatchIdAndUserId(matchId, userId) { 
  try {
    const res = await session.run(`
      MATCH (m:Message {matchId: $matchId, status: 'unread', to: $userId})
      SET m.status = 'read'
      RETURN COUNT(m) AS setAsReadMsgNb
    `, { matchId, userId });
    session.close();
    return;
  } catch(err) { console.log(err) }
}

module.exports = {
  getDiscussions,
  getCurrentDiscussionMessages,
  createMessage,
  getUnreadMessagesNb,
  getMatchIdsByUserId,
  setAllAsReadByMatchIdAndUserId,
}
