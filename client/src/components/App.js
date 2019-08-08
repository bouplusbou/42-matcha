import React, { useState, useEffect } from 'react';
import Main from './Main';
import Header from './Header/Header';
import { AppProvider } from '../AppContext';
import { actionIsAuthenticated } from '../actions/authActions';
import setupSocket from '../actions/socketActions';
import { ThemeProvider } from "styled-components";
import Theme from "./theme.json";
import { ToastProvider, useToasts } from 'react-toast-notifications'

function App() {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  
  useEffect(() => {
    actionIsAuthenticated(localStorage.getItem('token'))
      .then(username => {
        if (username) {
          setConnected(true);
          setupSocket(username, setSocket, setConnectedUsers);
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
      connectedUsers: connectedUsers,
      setConnectedUsers: setConnectedUsers,
      socket: socket,
      setSocket: setSocket,
  };

  return (
    <AppProvider value={appState}>
      <ToastProvider>
        <ThemeProvider theme={Theme}>
          <div>
            <Header />
            <Main />
          </div>
        </ThemeProvider>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
