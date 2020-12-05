import React, {useEffect, useState} from 'react';
import {
  useHistory
} from "react-router-dom";
import { useAuth } from "../../corp-auth.js";
import { NavBar } from '../../components/NavBar';
import { ShowUsers } from '../../components/ShowUsers';
import { Auth, API } from 'aws-amplify';

import Button from 'react-bootstrap/Button'

const Admin = props => {
  let history = useHistory();
  let auth = useAuth();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    listUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function addToGroup(username) {
    let apiName = 'AdminQueries';
    let path = '/addUserToGroup';
    let myInit = {
        body: {
          "username" : username,
          "groupname": "Manager"
        },
        headers: {
          'Content-Type' : 'application/json',
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
    setUsers(rest.Users);
    console.log(rest.Users)
    return rest;
  }

  async function enableUser(userId) {
    let apiName = 'AdminQueries';
    let path = '/confirmUserSignUp';
    let myInit = {
        body: {
          "username" : userId,
        },
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        }
    }
    return await API.post(apiName, path, myInit);
  }
console.log(users)
  return (
    <>
    < NavBar />
      <ShowUsers users={users} updateUser={addToGroup}/>
      <Button onClick={() => {listUsers(10)}}>Show users</Button>
      <Button onClick={() => {addToGroup()}}>Enable user</Button>
    </>
  )
}


export default Admin;
