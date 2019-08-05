import React, { useState, useEffect } from 'react';
import Main from './Main';
import Header from './Header/Header';
import { AppProvider } from '../AppContext';
import { actionIsAuthenticated } from '../actions/authActions';
import { ThemeProvider } from "styled-components";
import Theme from "./theme.json";

function App() {
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    actionIsAuthenticated(localStorage.getItem('token'))
      .then(isAuthenticated => isAuthenticated ? setConnected(true) : setConnected(false))
      .catch(err => setConnected(false));
  }, []);

  const appState = { 
      connected: connected,
      toggleConnected: () => {setConnected(!connected)}
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
