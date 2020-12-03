import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";

import { About } from './views/About';
import { Home } from './views/Home';
import { Welcome } from './views/Welcome';
import { Admin } from './views/Admin';
import { useAuth } from "./corp-auth.js";
import Container from 'react-bootstrap/Container'
import Getdetails from "./views/Getdetails/Getdetails";

export const Routes = () => {
  return (
    <Router >
      <Container fluid className="p-0">
        <Switch>
          <Route path="/about" component={About}  />
          <Route path="/login">
            <Welcome />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <PrivateRoute path="/home" component={Home}  />
          <PrivateRoute path="/getdetails" component={Getdetails}  />
          <AdminRoute path="/admin" component={Admin} />
        </Switch>
      </Container>
    </Router>
  );
}
/*
function AuthButton() {
  let history = useHistory();
  let auth = useAuth();
  return auth.user ? (
    <p>
      Welcome!{}
      <button
        onClick={() => {
          auth.logout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}
*/


export const PrivateRoute = (props) => {
  let auth = useAuth();
  const [state, setState] = useState('loading');
  const { component: Component, path, ...rest } = props;
  useEffect(() => {
    (async function () {
      try {
        /* Update effect logic to track correct state */
        const isUserLogged = await auth.checkAuth()
        setState(isUserLogged ? 'loggedin' : 'redirect');
      }
      catch {
        setState('redirect');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === 'loading') {
    return <div className="loading-screen"></div>
  }

  return (
    <Route
      path={path}
      {...rest}
      render={props => ((state === 'loggedin') ?
        <Component {...props} /> :
        <Redirect to={{ pathname: "/login" }} />)}
    />
  );
}

export const AdminRoute = (props) => {
  let auth = useAuth();
  const [state, setState] = useState('loading');
  const { component: Component, path, ...rest } = props;
  useEffect(() => {
    (async function () {
      try {
        const isUserLogged = await auth.checkAuth()
        const groups = isUserLogged.signInUserSession.idToken.payload['cognito:groups']
        setState((isUserLogged && groups.length > 0 && groups[0] == 'Admin') ? 'admin' : 'redirect');
      }
      catch {
        setState('redirect');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === 'loading') {
    return <div className="loading-screen"></div>
  }

  return (
    <Route
      path={path}
      {...rest}
      render={props => ((state === 'admin') ?
        <Component {...props} /> :
        <Redirect to={{ pathname: "/" }} />)}
    />
  );
}
