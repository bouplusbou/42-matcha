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
  console.log('userId:', client.handshake.query.userId);
  const userId = client.handshake.query.userId;
  client.userId = userId;
  return next();
});

io.on('connection', client => { 
  console.log('Client has connected to socket');
  console.log('connected socketIds:', Object.keys(io.sockets.sockets));
  console.log(`client.id: ${client.id}, client.userId: ${client.userId}`);

  client.join(`${client.userId}-room`);
  console.log(`${client.userId} joined "${client.userId}-room"`);

  const userIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId);
  console.log(`userIds: ${userIds}`);

  client.broadcast.emit('isConnected', userIds);

	client.on('disconnect', () => {
    console.log('Client has disconnected');
    const userIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId);
    io.emit('isConnected', userIds);
  });

  client.on('logout', () => {
    const filteredUserIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId).filter(userId => {
      return !(io.sockets.sockets[client.id].userId === userId);
    });
    client.broadcast.emit('isConnected', filteredUserIds);
    console.log('Client has logout');
    client.disconnect();
	});

  client.on('visit', async username => {
    const userIdVisited = await UserModel.userIdFromUsername(username);
    const usernameVisiter = await UserModel.usernameFromUserId(parseInt(client.userId, 10));
    console.log(`${usernameVisiter} with userId ${client.userId} has visited ${username}'s profile with userId ${userIdVisited}`);
    client.to(`${userIdVisited}-room`).emit('visited', usernameVisiter);
  });
});

const port = 5000;
server.listen(port, () => `Server running on port ${port}`);
