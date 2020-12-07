import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Dropdown, Button, Row, Col, Container, Nav, ListGroup } from 'react-bootstrap';
import { NavBar } from '../../components/NavBar'
import { Redirect } from "react-router-dom";
import './Getothersdetails.css';

const Getothersdetails = props => {
    console.log(props)

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
                    method: 'DELETE',
                    headers: myHeaders,
                    redirect: 'follow',
                    body: JSON.stringify({ "emp_no": props.location.state.data }),
                };
                fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items', requestOptions)
                    .then(response => response.text())
                    .then(response => {
                        console.log(JSON.parse(response))
                        setdata(JSON.parse(response))
                        console.log("hello", data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
    }, [token, props.location.state.data])

    const [value, setValue] = useState(null);
    const [empno, setempno] = useState(null)
    const [redirect, setredirect] = useState(false)
    const [teamdata, setteamdata] = useState(null)
    const [deptno, setdeptno] = useState(null)
    const handleSelect = (e) => {
        console.log(e);
        setValue(e)
    }
    const handleSelectdept = (e) => {
        setdeptno(e)
        console.log(deptno)
    }
    const handleClick = (e) => {
        console.log(e.target.attributes.key.value);
        setempno(e.target.attributes.key.value)
        setredirect(true)
    }
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items', {
            method: 'POST',
            body: JSON.stringify({
                "type": value,
                "deptno": deptno,
                "emp_no": props.location.state.data
            }),
            headers: myHeaders,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(response => {
                console.log(JSON.parse(response))
                var result = JSON.parse(response).map((element, index) => renderRow(index, element))
                setteamdata(result)
            })
            .catch(error => console.log(error));
    }, [deptno])

    function renderRow(index, element) {
        return (
            <Col md="5" >
                <ListGroup defaultActiveKey="#Getdetails">
                    <ListGroup.Item Key={element["emp_no"]} active action variant="info" onClick={handleClick} >

                        {element["first_name"]} {element["last_name"]}<br></br>
                        Employee No : {element["emp_no"]}

                    </ListGroup.Item>
                </ListGroup>

            </Col >

        )
    }
    if (data !== null) {
        var jobhistory = data["Job History"].map((element, index) => renderjobhistory(index, element));
        function renderjobhistory(index, element) {
            return (
                <Col>
                    Position :{element["title"]} <br></br>
                     From : {element["from_date"].substring(0, 10)}<br></br>
                     To : {element["to_date"].substring(0, 10)}

                </Col>

            )
        }
    }

    return (
        <div>
            { redirect &&
                <Redirect to={{
                    pathname: '/Getothersdetails',
                    state: { data: empno }
                }} />
            }
            < NavBar groups={props.currentUser.signInUserSession.idToken.payload['cognito:groups']} />
            {data !== null &&
              <div id="fb-root"></div>
              <script>
                window.fbAsyncInit = function() {
                  FB.init({
                    xfbml            : true,
                    version          : 'v9.0'
                  });
                };

                (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));</script>

              <!-- Your Chat Plugin code -->
              <div class="fb-customerchat"
                attribution=setup_tool
                page_id="101038381875294"
          theme_color="#0A7CFF"
          logged_in_greeting="Hi! This is Georgi Facello from TechCorp"
          logged_out_greeting="Hi! This is Georgi Facello from TechCorp">
              </div>                
                <div>
                    <h1 font-color="black">Details for: {data["first_name"]} {data["last_name"]} </h1><br></br>
                    <br></br>
                    <Container className="font" md="fluid">
                        <Row md="auto">
                            <Col>Employee Number : {data["emp_no"]} </Col>
                            <Col>Department Number : {data["dept_no"]} </Col><br></br>
                        </Row>
                        <br></br>
                        <Row>
                            <Col>Department : {data["dept_name"]}</Col>
                            <Col>Tenure : {data["tenure"]} </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col>Position : {data["title"]} </Col>
                            <Col>Hiredate : {data["hire_date"].substring(0, 10)}</Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col>
                                Job History  :
                            </Col>
                            <Col></Col>
                            <br></br>
                        </Row>
                        <Row>
                            {jobhistory}
                        </Row>
                        <br></br>
                    </Container>
                    <Container>
                        <Row className="search">To search for employees, please choose their position and department</Row>

                        <Row>
                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle className="font" variant="warning" id="dropdown-basic">
                                        Choose Position
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
                            </Col>

                            <Col>
                                <Dropdown>
                                    <Dropdown.Toggle className="font" variant="warning" id="dropdown-basic1">
                                        Choose Department
                                </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="d001" onSelect={handleSelectdept}>d001 : Marketing</Dropdown.Item>
                                        <Dropdown.Item eventKey="d002" onSelect={handleSelectdept}>d002 : Finance </Dropdown.Item>
                                        <Dropdown.Item eventKey="d003" onSelect={handleSelectdept}>d003 : Human Resources </Dropdown.Item>
                                        <Dropdown.Item eventKey="d004" onSelect={handleSelectdept}>d004 : Production</Dropdown.Item>
                                        <Dropdown.Item eventKey="d005" onSelect={handleSelectdept}>d005 : Development</Dropdown.Item>
                                        <Dropdown.Item eventKey="d006" onSelect={handleSelectdept}>d006 : Quality Management</Dropdown.Item>
                                        <Dropdown.Item eventKey="d007" onSelect={handleSelectdept}>d007 : Sales</Dropdown.Item>
                                        <Dropdown.Item eventKey="d008" onSelect={handleSelectdept}>d008 : Research</Dropdown.Item>
                                        <Dropdown.Item eventKey="d009" onSelect={handleSelectdept}>d009 : Customer Service</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Container>
                </div>
            }
            {teamdata !== null &&
                <Container md="fluid">
                    <br></br>
                    <Row className="font"> {value}'s in {deptno}  : </Row>
                    {teamdata !== null && teamdata.length === 0 &&
                        <Row className="font"> There are no {value} in this department </Row>}
                    <Row>{teamdata}</Row>
                </Container>
            }
        </div>
    )
}
export default Getothersdetails;
