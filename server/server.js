const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const UserModel = require('./models/UserModel');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

// const connectedUsers = [];


io.use((client, next) => {
  const userId = client.handshake.query.userId;
  client.userId = userId;
  return next();
});

io.on('connection', client => { 
  client.join(`${client.userId}-room`);

  const userIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId);

  client.broadcast.emit('isConnected', userIds);

	client.on('disconnect', () => {
    const userIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId);
    io.emit('isConnected', userIds);
  });

  client.on('logout', () => {
    const filteredUserIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId).filter(userId => {
      return !(io.sockets.sockets[client.id].userId === userId);
    });
    client.broadcast.emit('isConnected', filteredUserIds);
    client.disconnect();
	});

  client.on('visit', async username => {
    const userIdVisited = await UserModel.userIdFromUsername(username);
    const usernameVisiter = await UserModel.usernameFromUserId(parseInt(client.userId, 10));
    client.to(`${userIdVisited}-room`).emit('visited', usernameVisiter);
  });
});

const port = 5000;
server.listen(port, () => `Server running on port ${port}`);
