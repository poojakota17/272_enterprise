import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Guest } from './views/Guest';
import { UserPage } from './views/UserPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function() {
      try {
        /* Update effect logic to track correct state */
        //const isUserLogged = await auth.checkAuth()
        setUser(null);
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
