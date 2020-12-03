//import React from 'react';
//import Amplify, { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
//import awsconfig from '../../index.js';
import { Auth } from 'aws-amplify';
import { Dropdown, Button } from 'react-bootstrap';
import { useAuth } from "../../corp-auth.js";

const Getdetails = props => {

    const [token, settoken] = useState();
    console.log(token)
    useEffect(() => {
        Auth.currentSession()
            .then(cognitoUser => {
                const { idToken: { jwtToken } } = cognitoUser
                settoken(jwtToken);
                console.log(cognitoUser)
                console.log(token)
            })
    }, [])

    const [data, setdata] = useState(null);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    useEffect(() => {

        fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items', requestOptions)

            //.then(response => response.json())
            .then(response => response.text())
            //.then(response => alert(response))
            .then(response => {
                console.log(JSON.parse(response))
                setdata(JSON.parse(response))
                console.log("hello", data)
            })

            .catch(error => console.log(error));
    })
    return (
        <div>

            {/* <div>Employee Number : {data["emp_no"]} </div><br></br>
            <div>Department Number : {data["dept_no"]} </div><br></br>
            <div>First Name : {data["first_name"]} </div><br></br>
            <div>Last Name : {data["last_name"]} </div><br></br>
            <div>Hiredate : {data["hire_date"]} </div><br></br>
            <div>Salary : {data["salary"]} </div><br></br>
            <div>Designation : {data["title"]} </div><br></br>
            <div>Tenure : {data["tenure"]} </div> */}

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                    </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Manager">Manager</Dropdown.Item>
                    <Dropdown.Item eventKey="Senior Manager">Senior Manager</Dropdown.Item>
                    <Dropdown.Item eventKey="Assistant Manager">Assisant Manager</Dropdown.Item>
                    <Dropdown.Item eventKey="Senior Staff">Senior Staff</Dropdown.Item>
                    <Dropdown.Item eventKey="Staff">Staff</Dropdown.Item>
                    <Dropdown.Item eventKey="Technical Engineer">Technical Engineer</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

    )

}




export default Getdetails;
