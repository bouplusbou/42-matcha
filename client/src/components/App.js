import React, { useState, useEffect } from 'react';
import Main from './Main';
import Header from './Header/Header';
import { AppProvider } from '../AppContext';
import { actionIsAuthenticated } from '../actions/authActions';
import { ThemeProvider } from "styled-components";
import Theme from "./theme.json";
import io from 'socket.io-client';

function App() {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [notificationsSocket, setNotificationsSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  
  useEffect(() => {
    actionIsAuthenticated(localStorage.getItem('token'))
      .then(username => {
        if (username) {
          setConnected(true);


          const socket = io('http://localhost:5000', {
            query: {
              username: username
            }
          });
  

          // socket.emit('subscribeToIsConnected');
          socket.on('isConnected', usernames => {
            console.log(`The back sent new connectedUsers: ${usernames}`);
            setConnectedUsers(usernames);
        });

          // Add a connect listener
          socket.on('connect', () => {
            console.log('Client has connected to the server!');
          });
          // Add a connect listener
          socket.on('message', data => {
            console.log('Received a message from the server! 1', data);
          });
          // Add a disconnect listener
          socket.on('disconnect', () => {
            console.log('The client has disconnected!');
          });
  
          // Sends a message to the server via sockets
          function sendMessageToServer(message) {
            socket.send(message);
          }

          setSocket(socket);
          

          const notificationsSocket = io('http://localhost:5000/notifications');
          
          notificationsSocket.on('visited', username => {
            console.log(`${username} visited your profile !`);
          });

          notificationsSocket.on('message', data => {
            console.log('Received a message from the server! 2', data);
          });

          setNotificationsSocket(notificationsSocket);


          // const socket = io('http://localhost:5000');
          // const socket = io('http://localhost:5000?token=abc', {
          //   transportOptions: {
          //     polling: {
          //       extraHeaders: {
          //         'x-clientid': 'abc'
          //       }
          //     }
          //   }
          // });
        } else {
          setConnected(false)
        };
      })
      .catch(err => setConnected(false));
  }, []);

  const appState = { 
      connected: connected,
      setConnected: setConnected,
      toggleConnected: () => {setConnected(!connected)},
      socket: socket,
      setSocket: setSocket,
      connectedUsers: connectedUsers,
      setConnectedUsers: setConnectedUsers,
      notificationsSocket: notificationsSocket,
      setNotificationsSocket: setNotificationsSocket,
  };

  return (
    <AppProvider value={appState}>
      <ThemeProvider theme={Theme}>
       <div>
        <Header />
        <Main />
        </div>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
