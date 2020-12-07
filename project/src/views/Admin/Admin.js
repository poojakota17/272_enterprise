import React, {useEffect, useState} from 'react';
import { NavBar } from '../../components/NavBar';
import { ShowUsers } from '../../components/ShowUsers';
import { API } from 'aws-amplify';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Admin = props => {
  const [employees, setEmployees] = useState(null);
  const [managers, setManagers] = useState(null);
  const [users, setUsers] = useState(null);
  const [update, setUpdate] = useState(false);
  const token = props.currentUser.signInUserSession.accessToken.jwtToken;

  useEffect(() => {
    listUsers(process.env.REACT_APP_OKTA_GROUP, setEmployees);
    listUsers('Manager', setManagers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  useEffect(() => {
    if (employees && managers) {
      console.log("count users")
      setUsers(arrayDiffByKey('Username',employees, managers));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managers, employees]);
  console.log("users", users)
  console.log("managers", managers);
  console.log("emplo", employees)

  async function userInfo(username, setData) {
    console.log(username)
    let apiName = 'AdminQueries';
    let path = '/getUser';
    let myInit = {
      queryStringParameters: {
        "username" : username
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: token
      }
  }
  return await API.get(apiName, path, myInit);
}

  async function removeFromGroup(username) {
  let apiName = 'AdminQueries';
  let path = '/removeUserFromGroup';
  let myInit = {
      body: {
        "username" : username,
        "groupname": "Manager"
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: token
      }
  }
  await API.post(apiName, path, myInit);
  setUpdate(!update);
}

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
          Authorization: token
        }
    }
    await API.post(apiName, path, myInit)
    setUpdate(!update);
  }


  let nextToken;

  async function listUsers(group, setData, limit){
    let apiName = process.env.REACT_APP_ADMIN_EPNAME;
    let path = '/listUsersInGroup';
    let myInit = {
        queryStringParameters: {
          "groupname": group,
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
    setData(rest.Users);
    console.log(rest.Users)
    return rest;
  }

  return (
    <>
      < NavBar groups={props.currentUser.signInUserSession.idToken.payload['cognito:groups']}/>
      <div className="m-4">
        <h1 className="m-4">Managers</h1>
        <ShowUsers users={managers} upgrade={null} downgrade={removeFromGroup} getInfo={userInfo} />
      </div>

      <div className="m-4">
        <h1 className="mx-4 mt-4">Users</h1>
        <ShowUsers users={users} upgrade={addToGroup} downgrade={null} getInfo={userInfo} />
      </div>
    </>
  )
}

function arrayDiffByKey(key, arrayMain, arraySmall) {
  let mySet = new Set();
  arraySmall.forEach((e) => mySet.add(e[key]));
  let result = arrayMain.filter(e => !mySet.has(e[key]))
  return result
}

export default Admin;
