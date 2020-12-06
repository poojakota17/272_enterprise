import React from 'react';
import {
  useHistory
} from "react-router-dom";
import { useAuth } from "../../corp-auth.js";
import { NavBar } from '../../components/NavBar';

import Button from 'react-bootstrap/Button'

const Home = props => {
  let history = useHistory();
  let auth = useAuth();

  return (
    <div>
      < NavBar groups={props.currentUser.signInUserSession.idToken.payload['cognito:groups']}/>

      <p>

        Welcome!{" "}

      </p>
      Here will be our app
    </div>
  )
}


export default Home;
