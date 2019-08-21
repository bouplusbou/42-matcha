const driver = require('../db/database.js');
const session = driver.session();

async function setAllAsRead(uuid) { 
  try {
    const res = await session.run(`
    MATCH (n:Notification {to: $uuid})
    WHERE n.status = 'unseen'
    SET n.status = 'seen'
    RETURN n
    `, { 
      uuid: uuid,
    });
    session.close();
  } catch(err) { console.log(err) }
}

async function getNotifications(uuid) { 
  try {
    const res = await session.run(`
      MATCH (n:Notification {to: $uuid})
      WITH n, n.from AS userId, n.type AS type, duration.inDays(n.dateTime, DateTime()).days as days, n.status AS status
      MATCH (u:User {userId: userId})
      RETURN u.username AS username, type, days, status
      ORDER BY n.dateTime DESC
    `, { uuid: uuid });
    session.close();
    const notifications = res.records.map(record => {
      const username = record.get('username');
      const type = record.get('type');
      const days = record.get('days').low;
      const status = record.get('status');
      return { username, type, days, status }
    });
    setAllAsRead(uuid);
    return notifications;
  } catch(err) { console.log(err) }
}

async function createNotification(uuid, type, userId) { 
  console.log(uuid, type, userId);
  try {
    await session.run(`
      CREATE (n:Notification {
        type: $type,
        from: $userId,
        to: $uuid,
        status: 'unseen',
        dateTime: DateTime() 
      })
      `, {
      type: type,
      userId: userId,
      uuid: uuid,
    });
    session.close();
  } catch(err) { console.log(err) }
}

async function unseenNotificationsNb(uuid) { 
  try {
    const res = await session.run(`
    MATCH (n:Notification {to: $uuid})
    WHERE n.status = 'unseen'
    RETURN COUNT(n) AS nb
    `, { 
      uuid: uuid,
    });
    session.close();
    const nb = res.records[0].get('nb').low;
    return nb;
  } catch(err) { console.log(err) }
}

module.exports = {
  getNotifications,
  createNotification,
  unseenNotificationsNb,
}
