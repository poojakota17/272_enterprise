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
import Getothersdetails from "./views/Getothersdetails/Getothersdetails"
import Manager from "./views/Manager/Manager";
import Feedback from "./views/Feedback/Feedback";
export const Routes = () => {
  return (
    <Router >
      <Container fluid className="p-0">
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/login">
            <Welcome />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <PrivateRoute path="/home" component={Home} exact />
          <PrivateRoute path="/feedback" component={Feedback} exact />
          <PrivateRoute path="/getdetails" component={Getdetails} exact />
          <PrivateRoute path="/getothersdetails" component={Getothersdetails} exact />
          <GroupRoute path="/admin" component={Admin} group="Admin" exact />
          <PrivateRoute path="/manager" component={Manager} group="Manager" exact />
        </Switch>
      </Container>
    </Router>
  );
}

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

export const GroupRoute = (props) => {
  let auth = useAuth();
  const [state, setState] = useState('loading');
  const { component: Component, path, ...rest } = props;
  useEffect(() => {
    (async function () {
      try {
        const isUserLogged = await auth.checkAuth()
        const groups = isUserLogged.signInUserSession.idToken.payload['cognito:groups']
        setState((isUserLogged && groups.length > 0 && groups.includes(props.group)) ? 'allowed' : 'redirect');
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
      render={props => ((state === 'allowed') ?
        <Component {...props} /> :
        <Redirect to={{ pathname: "/" }} />)}
    />
  );
}
