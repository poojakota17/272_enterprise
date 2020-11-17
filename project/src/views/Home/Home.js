import React from 'react';
import {
  useHistory
} from "react-router-dom";
import { useAuth } from "../../corp-auth.js";
import { NavBar } from '../../components/NavBar';

const Home = props => {
    let history = useHistory();
    let auth = useAuth();

  return (
    <div>
              < NavBar />
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.logout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
      Here will be our app
    </div>
  )
}


export default Home;
