import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { Guest } from './views/Guest';
import { UserPage } from './views/UserPage';
import Amplify, { Auth, Hub } from 'aws-amplify';

function App() {
  const [user, setUser] = useState(null);

/*  useEffect(() => {
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

*/

useEffect(() => {
  let updateUser = async authState => {
    try {
      let user = await Auth.currentAuthenticatedUser()
      setUser(user)
    } catch {
      setUser(null)
    }
  }
  Hub.listen('auth', updateUser) // listen for login/signup events
  updateUser() // check manually the first time because we won't get a Hub event
  return () => Hub.remove('auth', updateUser) // cleanup
}, []);

  return user ? (<UserPage />) : (<Guest />);
}

export default App;
