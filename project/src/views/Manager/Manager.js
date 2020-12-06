import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Dropdown, Button, Row, Col, Container, Nav, ListGroup, Form, Card, Modal } from 'react-bootstrap';
import { NavBar } from '../../components/NavBar';
import { Redirect } from "react-router-dom";
import Logo from './twitter.png';
import './Manager.css'
//import { render } from '../../../amplify/backend/function/infofetcher/src/app';


var token;

const Manager = props => {

    const [token, settoken] = useState(null);
    const [data, setdata] = useState(null);
    const [dept, setdept] = useState(null);
    const [tweet, settweet] = useState('');
    const [empno, setempno] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

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
                    method: 'POST',
                    body: JSON.stringify({
                        "position": dept
                    }),
                    headers: myHeaders,
                    redirect: 'follow'
                };
                fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items/manage', requestOptions)
                    .then(response => response.text())
                    // .then(response => alert(response))
                    .then(response => {
                        console.log(JSON.parse(response))
                        var result = JSON.parse(response).map((element, index) => renderRow(index, element));
                        setdata(result)
                        console.log("hello", data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
    }, [dept])
    function renderRow(index, element) {
        return (
            <Col md="5" >
                <ListGroup >
                    <ListGroup.Item Key={element["emp_no"]} active action variant="info" onClick={handleClick} >

                        Employee No : {element["emp_no"]}  <br />      Name : {element["first_name"]} {element["last_name"]}<br />
                            Position : {element["title"]}<br />
                        Salary : ${element["salary"]}

                    </ListGroup.Item>
                </ListGroup>

            </Col >

        )
    }



    const handleClick = (e) => {
        console.log(e.target.attributes.key.value);
        setempno(e.target.attributes.key.value)
        console.log(e.target.innerText)
        setShow(true)
        handlemodal();
    }
    const handlemodal = () => {

        return (
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
              </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
            //s</>
        )
    }
    // setredirect(true)

    const handleSelect = (e) => {
        console.log(e);
        setdept(e)
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





    return (
        <div >

            <NavBar groups={props.currentUser.signInUserSession.idToken.payload['cognito:groups']} />


            <br />
            <Container>
                <Row>
                    <Col>
                        <a className="font">Manage Department Employees</a>
                        <br />
                        <Dropdown>
                            <Dropdown.Toggle className="font" variant="warning" id="dropdown-basic">
                                Choose Position
                    </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Senior Engineer" onSelect={handleSelect}>Senior Engineer</Dropdown.Item>
                                <Dropdown.Item eventKey="Assistant Engineer" onSelect={handleSelect}>Assisant Engineer</Dropdown.Item>
                                <Dropdown.Item eventKey="Senior Staff" onSelect={handleSelect}>Senior Staff</Dropdown.Item>
                                <Dropdown.Item eventKey="Staff" onSelect={handleSelect}>Staff</Dropdown.Item>
                                <Dropdown.Item eventKey="Technical Engineer" onSelect={handleSelect}>Technical Engineer</Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>
                    </Col>
                    <Col></Col>
                    <Col>
                        <Card style={{ width: '24rem' }}>
                            <Card.Img variant="top" src={Logo} className="logo" />
                            <Card.Body >
                                <Card.Text className="font">
                                    Share your new product features to organization's twitter handle!!!!!
                          </Card.Text>
                                <Form.Group>
                                    <Form.Control as="textarea" rows={3} type="text" onChange={myChangeHandler} placeholder="Post to twitter" />
                                </Form.Group>
                                <Button type="submit" onClick={handlebutton} variant="primary" >Tweet</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {data !== null &&
                    <Container md="fluid">
                        <Row></Row>
                        <Row>
                            {data}
                        </Row>
                    </Container>
                }
            </Container>

            {/* { setShow === true &&
                <div>
                    <handleClick />

                </div>
            } */}

        </Container>

    )

}





export default Manager;
