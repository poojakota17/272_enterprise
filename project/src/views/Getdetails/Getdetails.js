//import React from 'react';
import Amplify, { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
//import awsconfig from '../../index.js';
import { Auth } from 'aws-amplify';
import { Dropdown, Button, Row, Col } from 'react-bootstrap';
import awsmobile from '../../aws-exports';
//import { useAuth } from "../../corp-auth.js";
//Auth.configure(awsmobile)

const Getdetails = props => {

    const [token, settoken] = useState(null);
    const [data, setdata] = useState(null);
    useEffect(() => {
        Auth.currentSession()
            .then(cognitoUser => {
                const { idToken: { jwtToken } } = cognitoUser
                settoken(jwtToken);
                console.log(cognitoUser)
                console.log(token)
            })
            .then(cognitoUser => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Content-Type", "application/json");
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items', requestOptions)
                    .then(response => response.text())
                    // .then(response => alert(response))
                    .then(response => {
                        console.log(JSON.parse(response))
                        setdata(JSON.parse(response))
                        console.log("hello", data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
    }, [token])

    const [value, setValue] = useState(null);
    const [teamdata, setteamdata] = useState(null)
    const handleSelect = (e) => {
        console.log(e);
        setValue(e)
    }
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items', {
            method: 'POST',
            body: JSON.stringify({ "type": value }),
            headers: myHeaders,
            redirect: 'follow'
        })
            .then(response => response.text())
            //.then(response => alert(response))
            .then(response => {
                console.log(JSON.parse(response))
                var result = JSON.parse(response).map((element, index) => renderRow(index, element))
                setteamdata(result)
                console.log("helloteamdata", teamdata)
            })
            .catch(error => console.log(error));
    }, [value])

    function renderRow(index, element) {
        return (
            <Col >
                <Row>{element}</Row>
            </Col>

        )
    }

    return (
        <div align="center">

            {data !== null &&
                <Col>
                    <h1 align="center">Hello, {data["first_name"]} {data["last_name"]} </h1>
                    <Row>Employee Number : {data["emp_no"]} </Row>
                    <Row>Department Number : {data["dept_no"]} </Row>
                    <Row>Hiredate : {data["hire_date"]} </Row>
                    <Row>Salary : {data["salary"]} </Row>
                    <Row>Designation : {data["title"]} </Row>
                    <Row>Tenure : {data["tenure"]} </Row>
                </Col>
            }


            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    View my department employees
                    </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Manager" onSelect={handleSelect}>Manager</Dropdown.Item>
                    <Dropdown.Item eventKey="Senior Engineer" onSelect={handleSelect}>Senior Engineer</Dropdown.Item>
                    <Dropdown.Item eventKey="Assistant Engineer" onSelect={handleSelect}>Assisant Engineer</Dropdown.Item>
                    <Dropdown.Item eventKey="Senior Staff" onSelect={handleSelect}>Senior Staff</Dropdown.Item>
                    <Dropdown.Item eventKey="Staff" onSelect={handleSelect}>Staff</Dropdown.Item>
                    <Dropdown.Item eventKey="Technical Engineer" onSelect={handleSelect}>Technical Engineer</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {teamdata !== null &&
                <div> {teamdata}</div>
            }
        </div >

    )

}

export default Getdetails;
