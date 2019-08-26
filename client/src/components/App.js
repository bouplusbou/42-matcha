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
  const [unreadMessagesNb, setUnreadMessagesNb] = useState(0);
  const [discussions, setDiscussions] = useState(null);
  const [currentDiscussionInfo, setCurrentDiscussionInfo] = useState(null);
  const [currentDiscussionMessages, setCurrentDiscussionMessages] = useState(null);
  
  useEffect(() => {
    let isSubscribed = true;
    async function fetchData() {
      try {
        const userId = await actionIsAuthenticated(localStorage.getItem('token'));
        if (userId !== null) {
          const authToken = localStorage.getItem('token');
          const resNotif = await axios.get(`/notifications/unseenNotificationsNb?authToken=${authToken}`);
          if (isSubscribed) setUnseenNotificationsNb(resNotif.data.nb);
          const resMsg = await axios.get(`/chat/unreadMessagesNb?authToken=${authToken}`);
          if (isSubscribed) {
            setUnreadMessagesNb(resMsg.data.nb);
            setupSocket(authToken, setSocket, setConnectedUsers);
            setConnected(true);
          }
        } else {
          if (isSubscribed) setConnected(false)
        }
      } catch(e) {
        if (isSubscribed) setConnected(false)
      }
    };
    fetchData();
    return () => isSubscribed = false;
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
      unreadMessagesNb, 
      setUnreadMessagesNb,
      discussions,
      setDiscussions,
      currentDiscussionInfo,
      setCurrentDiscussionInfo,
      currentDiscussionMessages,
      setCurrentDiscussionMessages,
  };

  return (
    <Fragment>
      <AppProvider value={appState}>
        <ThemeProvider theme={Theme}>
      {!connected ? <UnauthenticatedMain /> : 
          <div>
            <Header />
            <AuthenticatedMain />
          </div> }
        </ThemeProvider> 
      </AppProvider>
    </Fragment>
  );
}

export default App;
