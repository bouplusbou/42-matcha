import React, { useState, useEffect, Fragment } from 'react';
import AuthenticatedMain from './AuthenticatedMain';
import UnauthenticatedMain from './UnauthenticatedMain';
import Header from './Header/Header';
import { AppProvider } from '../AppContext';
import { actionIsAuthenticated } from '../actions/authActions';
import setupSocket from '../actions/socketActions';
import { ThemeProvider } from 'styled-components';
import Theme from './theme.json';
import axios from 'axios';

function App() {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [unseenNotificationsNb, setUnseenNotificationsNb] = useState(0);
  
  useEffect(() => {
      async function fetchData() {
        try {
          const userId = await actionIsAuthenticated(localStorage.getItem('token'));
          if (userId !== null) {
            const authToken = localStorage.getItem('token');
            const resNotif = await axios.get(`/notifications/unseenNotificationsNb?authToken=${authToken}`);
            setUnseenNotificationsNb(resNotif.data.nb);
            setupSocket(userId, setSocket, setConnectedUsers);
            setConnected(true);
          } else {
            setConnected(false)
          }
        } catch {
          setConnected(false)
        }
      };
      fetchData();
  }, []);

  const appState = {
      connected,
      setConnected,
      toggleConnected: () => {setConnected(!connected)},
      connectedUsers,
      setConnectedUsers,
      socket,
      setSocket,
      unseenNotificationsNb, 
      setUnseenNotificationsNb,
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
