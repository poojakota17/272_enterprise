import React, { useState, useMemo, useEffect, useContext, createContext } from "react";
import { Auth } from 'aws-amplify';
const authContext = createContext();

export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null);
  const [cognitoUser, setCognitoUser] = useState(null);
  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user)
      })
      .catch(() => setUser(null))
  }, []);

  const federated = () => {
    Auth.federatedSignIn({provider: 'okta'}).then((result) => console.log(result)).catch((err) => {console.log(err)})
  }

  const getSession = () => {
    Auth.currentSession().then((user) => {
      console.log(user.idToken)
      return user
    setCognitoUser(user)}).catch(err => {console.log(err)})
  }

    const login = (username, password, toMain, setError) => {
      Auth.signIn(username, password).then(user => {
        setUser(user);
        toMain();
        return user;
      }).catch((err) => {

        if (err.code === 'UserNotFoundException') {
            err.message = 'Invalid username or password';
          }
        setError({password: err.message})
        return  err;
      })
    };

    const signup = (username, email, password, toMain, setError) => {
      console.log(username)
      console.log(email)
      console.log(password)
      Auth.signUp(
      {  username: username,
  password: password,
  attributes: {
    email: email
  }}).then(user => {
        setUser(user);
        console.log(user);
        toMain();
        return user;
      }).catch((err) => {
        console.log(err)
        setError({password: err.message});
        return err;
      })
    }


      const logout = cb =>
      Auth.signOut().then(data => {
        setUser(null);
        cb()
        return data;
      });

      const checkAuth = () => {
        return Auth.currentAuthenticatedUser()
      }

const values=useMemo(() => ({user, login, logout, signup, checkAuth, federated, cognitoUser, getSession}), [user]);


  return (
    <authContext.Provider value={values}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () =>  {
  return useContext(authContext);
}


export const useUser = () => {
  const context = React.useContext(authContext);

  if(context === undefined) {
    throw new Error('`useUser` hook must be used within a `UserProvider` component');
  }
  return context;
};
