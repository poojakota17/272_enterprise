import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import { Modal, Container, Row, Card, Alert, Col, Collapse, Form, Navbar, Nav, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Feedback.css';
import { listFeedbacks } from '../../graphql/queries';
import { NavBar } from '../../components/NavBar';
//import { GrChat,GrEdit, GrTrash } from "react-icons/gr";
import { createFeedback as createFeedbackMutation, updateFeedback as updateFeedbackMutation, deleteFeedback as deleteFeedbackMutation } from '../../graphql/mutations';
const initialFormState = { recipient:'',feedback: '', sender: '' }
const nameState = {fname:"", lname:""};

//const Url = "https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items";

function Feedback() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
    const [sentFeedbacks, setSentFeedbacks] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [name, setName] = useState(nameState);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const [userData, setUserData] = useState({});
    
    useEffect(() => {
        //getEmail();
        fetchFeedbacks();
     //   userWithFetch();
    }, []);
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

                        console.log("response",JSON.parse(response))
                        setdata(JSON.parse(response))
                        console.log("data set from response", data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
    }, [token])

    async function fetchFeedbacks() {
       // const user = await Auth.currentAuthenticatedUser();
       console.log("In fetchFeedbacks")
        const apiData = await API.graphql({ query: listFeedbacks });
        
        console.log("apidata", apiData)
        console.log("fname, lname",name.fname, name.lname)
       // setFormData({ ...formData, sender: data["first_name"].toLowerCase() +"."+ data["last_name"]}+"techcorp.com");
        //console.log("fnamemmme",data["first_name"])
      console.log("formdata.sender",formData.sender)
      console.log("Done fetching!");
    }
  
    async function createFeedback() {
        if (!name.fname || !name.lname || !formData.feedback) return;
        //getEmail();
        console.log("in create feedback")
        console.log(name.fname);
        formData.recipient = name.fname.toLowerCase() + "." + name.lname.toLowerCase() + "@techcorp.com";
        console.log("Recipient is " + formData.recipient);
        await API.graphql({ query: createFeedbackMutation, variables: { input: formData } });
        setFeedbacks([...feedbacks, formData]);
        setFormData(initialFormState);
        console.log("DOne creating!")
    }

    return (
        <div>
             <NavBar/>
             
             
             <div>
             
             
                <Button variant="primary" onClick={handleShow}>
               
                    Compose &nbsp;
                </Button>
                
             <p>Please click on "Compose" to create the feedback</p>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please write a feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Write recipient firstname.lastname (eg john.smith )</Form.Label>
                                <Form.Control size="lg" type="text"
                                    onChange={e => setName({ ...name, 'fname': e.target.value })}
                                    placeholder="Recipient Fname"
                                    value={name.fname}
                                />  
                                <Form.Control size="lg" type="text"
                                    onChange={e => setName({ ...name, 'lname': e.target.value })}
                                    placeholder="Recipient lname"
                                    value={name.lname}
                                />  @techcorp.com
                                 <br />
                                <Form.Control as="textarea" rows={3}
                                    onChange={e => setFormData({ ...formData, 'feedback': e.target.value })}
                                    placeholder="Write feedback"
                                    value={formData.feedback}
                                />
                            </Form.Group>
                        </Form>
                         </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                         </Button>
                        <Button variant="primary" onClick={createFeedback}>Ok</Button>
                    </Modal.Footer>
                </Modal>
                
            
            
            </div>
             </div>
                
    );
}
export default Feedback;