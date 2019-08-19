import React, { useState, useEffect, Fragment } from 'react';
import AuthenticatedMain from './AuthenticatedMain';
import UnauthenticatedMain from './UnauthenticatedMain';
import Header from './Header/Header';
import { AppProvider } from '../AppContext';
import { actionIsAuthenticated } from '../actions/authActions';
import setupSocket from '../actions/socketActions';
import { ThemeProvider } from "styled-components";
import Theme from "./theme.json";


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
    <Fragment>
      <AppProvider value={appState}>
      {!connected ? <UnauthenticatedMain /> : 
        <ThemeProvider theme={Theme}>
          <div>
            <Header />
            <AuthenticatedMain />
          </div>
        </ThemeProvider> }
      </AppProvider>
    </Fragment>
  );
}

export default App;
