import React from 'react';
import {
  useHistory
} from "react-router-dom";
import { useAuth } from "../../corp-auth.js";
import { NavBar } from '../../components/NavBar';
import { Auth, API } from 'aws-amplify';

import Button from 'react-bootstrap/Button'

const Admin = props => {
  let history = useHistory();
  let auth = useAuth();


  async function addToGroup(username, group) {
    let apiName = 'AdminQueries';
    let path = '/addUserToGroup';
    let myInit = {
        body: {
          "username" : username,
          "groupname": group
        },
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    return await API.post(apiName, path, myInit);
  }


  let nextToken;

  async function listUsers(limit){
    let token = (await Auth.currentSession()).getAccessToken().getJwtToken();
    console.log(token);
    let userGroup = process.env.REACT_APP_OKTA_GROUP
    let apiName = process.env.REACT_APP_ADMIN_EPNAME;
    let path = '/listUsersInGroup';
    let myInit = {
        queryStringParameters: {
          "groupname": userGroup,
          "limit": limit,
          "token": nextToken
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: token
        },
    }
    const { NextToken, ...rest } =  await API.get(apiName, path, myInit);
    nextToken = NextToken;
    console.log(rest)
    return rest;
  }
  async function enableUser() {
    let apiName = 'AdminQueries';
    let path = '/confirmUserSignUp';
    let myInit = {
        body: {
          "username" : "oktanew_00u13gtj1mD77c7225d6",
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    console.log("hello")
    return await API.post(apiName, path, myInit);
  }

  return (
    <>
    < NavBar />
      <Button onClick={() => {listUsers(10)}}>Show users</Button>
      <Button onClick={() => {enableUser()}}>Enable user</Button>
    </>
  )
}


export default Admin;
