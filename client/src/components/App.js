import React, { useState, useEffect } from 'react';
import Main from './Main';
import Header from './Header/Header';
import { AppProvider } from '../AppContext';
import { actionIsAuthenticated } from '../actions/authActions';

function App() {

  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    actionIsAuthenticated(localStorage.getItem('token'))
      .then(isAuthenticated => isAuthenticated ? setConnected(true) : setConnected(false))
      .catch(err => setConnected(false));
  });

  const appState = { 
      connected: connected,
      toggleConnected: () => {setConnected(!connected)}
  };

  return (
    <AppProvider value={appState}>
      <div>
        <Header />
        <Main />
      </div>
    </AppProvider>
  );
}

export default App;
