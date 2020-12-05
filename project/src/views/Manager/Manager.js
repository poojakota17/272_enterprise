import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Dropdown, Button, Row, Col, Container, Nav, ListGroup, Form, Card } from 'react-bootstrap';
import { NavBar } from '../../components/NavBar';
import { Redirect } from "react-router-dom";
import Logo from './twitter.png';
import './Manager.css'


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
                fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items/retrieve', requestOptions)
                    .then(response => response.text())
                    .then(response => alert(response))
                    // .then(response => {
                    //     console.log(JSON.parse(response))
                    //     setdata(JSON.parse(response))
                    //     console.log("hello", data)
                    // })
                    .catch(error => {
                        console.log(error)
                    });
            })
    }, [token])


    const [tweet, settweet] = useState('')



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

            <NavBar />


            <br />
            <Row>

                <Col></Col>
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

        </div >

    )

}





export default Manager;