import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Guest } from './views/Guest';
import { UserPage } from './views/UserPage';
import { Auth } from 'aws-amplify';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      }
      catch {
        setUser(null);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return user ? (<UserPage />) : (< Guest />);
}

export default App;
