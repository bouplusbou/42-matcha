import React, { useState, useEffect } from 'react';
import Main from './Main';
import Header from './Header/Header';
import { AppProvider } from '../AppContext';
import { actionIsAuthenticated } from '../actions/authActions';
import { setupIsConnectedSocket, setupNotificationsSocket } from '../actions/socketActions';
import { ThemeProvider } from "styled-components";
import Theme from "./theme.json";
import { ToastProvider, useToasts } from 'react-toast-notifications'

function App() {
  const [connected, setConnected] = useState(false);
  const [isConnectedSocket, setIsConnectedSocket] = useState(null);
  const [notificationsSocket, setNotificationsSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  
  useEffect(() => {
    actionIsAuthenticated(localStorage.getItem('token'))
      .then(username => {
        if (username) {
          setConnected(true);
          setupIsConnectedSocket(setIsConnectedSocket, username, setConnectedUsers);
          setupNotificationsSocket(username, setNotificationsSocket);
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
      isConnectedSocket: isConnectedSocket,
      setIsConnectedSocket: setIsConnectedSocket,
      connectedUsers: connectedUsers,
      setConnectedUsers: setConnectedUsers,
      notificationsSocket: notificationsSocket,
      setNotificationsSocket: setNotificationsSocket,
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
