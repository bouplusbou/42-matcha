const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

// const connectedUsers = [];


io.use((client, next) => {
  console.log('username:', client.handshake.query.username);
  const username = client.handshake.query.username;
  client.username = username;
  return next();
});

io.on('connection', client => { 
  console.log('Client has connected to socket');
  console.log('connected socketIds:', Object.keys(io.sockets.sockets));
  console.log(`client.id: ${client.id}, client.username: ${client.username}`);

  client.join(`${client.username}-room`);
  console.log(`${client.username} joined "${client.username}-room"`);

  const usernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username);
  console.log(`usernames: ${usernames}`);

  // io.emit('isConnected', usernames);
  // client.emit('isConnected', usernames);
  client.broadcast.emit('isConnected', usernames);

	client.on('disconnect', () => {
    console.log('Client has disconnected');
    const usernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username);
    io.emit('isConnected', usernames);
  });

  client.on('logout', () => {
    // connectedUsers.splice(connected  Users.indexOf(username), 1);

    const filteredUsernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username).filter(username => {
      return !(io.sockets.sockets[client.id].username === username);
    });
    client.broadcast.emit('isConnected', filteredUsernames);
    console.log('Client has logout');
    client.disconnect();
	});

  client.on('visit', username => {
    console.log(`Client has visited ${username}'s profile`);
    client.to(`${username}-room`).emit('visited', client.username);
  });
});

const port = 5000;
server.listen(port, () => `Server running on port ${port}`);
