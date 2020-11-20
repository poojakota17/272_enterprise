import React, { useState, useMemo, useEffect, useContext, createContext } from "react";
import { Auth } from 'aws-amplify';
const authContext = createContext();

export function ProvideAuth({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user)
      })
      .catch(() => setUser(null))
  }, []);

  const federated = () => {
    Auth.federatedSignIn({provider: 'okta'}).then((result) => console.log(result)).catch((err) => console.log(err))
  }

    const login = (email, password, toMain, setError) => {
      Auth.signIn(email, password).then(user => {
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

    const signup = (email, password, toMain, setError) => {
      Auth.signUp(email, password).then(user => {
        setUser(user);
        console.log(user);
        toMain();
        return user;
      }).catch((err) => {
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

const values=useMemo(() => ({user, login, logout, signup, checkAuth, federated}), [user]);


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
