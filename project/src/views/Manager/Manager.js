import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Dropdown, Button, Row, Col, Container, Nav, ListGroup, Form } from 'react-bootstrap';
import { NavBar } from '../../components/NavBar';
import { Redirect } from "react-router-dom";


var token;

const Manager = props => {

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
    const [empno, setempno] = useState(null)
    const [redirect, setredirect] = useState(false)
    const [teamdata, setteamdata] = useState(null)
    const [tweet, settweet] = useState('')
    const handleSelect = (e) => {
        console.log(e);
        setValue(e)
    }
    const handleClick = (e) => {
        console.log(e.target.attributes.key.value);
        setempno(e.target.attributes.key.value)
        setredirect(true)
    }
    const myChangeHandler = (e) => {
        console.log("hellochange", e.target.value)
        settweet(e.target.value)
    }
    const handlebutton = (e) => {
        console.log("hellobutton", e)


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch('https://ptr4ebxlci.execute-api.us-east-1.amazonaws.com/dev/post', {
            method: 'POST',
            body: JSON.stringify({
                "text": tweet

            }),
            headers: myHeaders,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(response => alert("Successfully Posted"))
            .catch(error => console.log(error));
    }


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items', {
            method: 'POST',
            body: JSON.stringify({
                "type": value,
                "emp_no": "XXXX"
            }),
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
        <div >
            { redirect &&
                <Redirect to={{
                    pathname: '/Getothersdetails',
                    state: { data: empno }
                }} />
            }
            <NavBar />

            {data !== null &&
                <div>
                    <h1 font-color="black">Hello, {data["first_name"]} {data["last_name"]} </h1><br></br>
                    <br></br>
                    <Form.Group>

                        <Form.Control as="textarea" rows={3} type="text" onChange={myChangeHandler} placeholder="Post to twitter" />

                    </Form.Group>
                    <Button type="submit" onClick={handlebutton} variant="primary" >Send</Button>
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
                            <Col>Salary : ${data["salary"]} </Col>


                        </Row>


                        <br></br>

                    </Container>
                    {/* </Row> */}




                    <Dropdown>
                        <Dropdown.Toggle className="font" variant="warning" id="dropdown-basic">
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
                </div>
            }
            {teamdata !== null &&
                <Container md="fluid">
                    <br></br>
                    <Row className="font"> {value}'s : </Row>
                    {teamdata !== null && teamdata.length === 0 &&
                        <Row className="font"> There are no {value} in {data["dept_name"]} department </Row>}
                    <Row>{teamdata}</Row>


                </Container>
            }

        </div >

    )

}





export default Manager;