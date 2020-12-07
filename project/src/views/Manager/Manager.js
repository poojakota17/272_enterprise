import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Dropdown, Button, Row, Col, Container, Nav, ListGroup, Form, Card, Modal } from 'react-bootstrap';
import { NavBar } from '../../components/NavBar';
import { Modals } from '../../components/Modals';
import { Redirect } from "react-router-dom";
import Logo from './twitter.png';
import './Manager.css'



var token;

const Manager = props => {

    const [token, settoken] = useState(null);
    const [data, setdata] = useState(null);
    const [dept, setdept] = useState(null);
    const [tweet, settweet] = useState('');
    const [empno, setempno] = useState(null);
    const [show, setShow] = useState(false);
    const [text, settext] = useState('')
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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
            <Col sm={6}>
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
        settext(e.target.innerText)
        handleShow();
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


    const departments = ['Senior Engineer', 'Assisant Engineer', 'Senior Staff', 'Staff', 'Technical Engineer']
        .map((dep, index) => <Dropdown.Item eventKey={dep} key={index} onSelect={handleSelect}>{dep}</Dropdown.Item>)


    return (
      <>
        <NavBar groups={props.currentUser.signInUserSession.idToken.payload['cognito:groups']} />
        <Modals show={show} close={handleClose} empno={empno} text={text} token={token} />
        <Container>
          <Row className="mt-4">
            <Col sm={8}>
              <h2>Manage Department Employees</h2>
              <Dropdown className="my-4">
                  <Dropdown.Toggle className="font" variant="warning" id="dropdown-basic">
                      Choose Position
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                  {departments}
                  </Dropdown.Menu>
              </Dropdown>
              <Row>{data}</Row>
            </Col>
            <Col sm={4}>
                        <Card border="primary" style={{ width: '22rem' }}>
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
        </Container>
      </>
    )

}





export default Manager;
