import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Guest } from './views/Guest';
import { UserPage } from './views/UserPage';
import Amplify, { Auth, Hub } from 'aws-amplify';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          setUser({ user: data });
          break;
        case "signOut":
          setUser({ user: null });
          break;
        case "customOAuthState":
          setUser({ customState: data });
      }
    });
    Auth.currentAuthenticatedUser()
      .then(user => setUser({ user }))
      .catch(() => console.log("Not signed in"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user ? (<UserPage />) : (<Guest />);
}

export default App;
