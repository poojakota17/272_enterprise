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
   setFormData({ ...formData, sender: data["first_name"].toLowerCase() +"."+ data["last_name"].toLowerCase()+"@techcorp.com"});
    console.log("fnamemmme",data["first_name"])
      console.log("formdata.sender",formData.sender)
      console.log("Done fetching!");

      const inboxres = apiData.data.listFeedbacks.items.filter(item => item.recipient === formData.recipient);
      console.log("inbox res ", inboxres);
      setReceivedFeedbacks(inboxres);
      const sentres = apiData.data.listFeedbacks.items.filter(item => item.sender === formData.sender);
      setSentFeedbacks(sentres);
      console.log("sent res", sentres);


    }
  
    async function createFeedback() {
        if (!name.fname || !name.lname || !formData.feedback) return;
        //getEmail();
        console.log("in create feedback")
        console.log(name.fname);
       // formData.recipient = name.fname.toLowerCase() + "." + name.lname.toLowerCase() + "@techcorp.com";
        //console.log("Recipient is " + formData.recipient);
        await API.graphql({ query: createFeedbackMutation, variables: { input: formData } });
        setFeedbacks([...feedbacks, formData]);
        setFormData(initialFormState);
        console.log("DOne creating!")
        fetchFeedbacks()
    }

    return (
        <div>
             <NavBar/>
             <div>
             <p>Please click on "Compose" to create the feedback</p>
                <Button variant="primary" onClick={handleShow}>
               
                    Compose &nbsp;
                </Button>
                <Button variant="primary" onClick={fetchFeedbacks}>
                            fetch
                         </Button>
                
             
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
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={1}>
                        <Nav variant="pills" className="flex-column ">
                            <Nav.Item>
                                <Nav.Link eventKey="first" >Inbox</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" >Sent Box</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={11}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <h1>INBOX </h1>
                                <Container>
                                
                                <div >
                                        <div className="col container" style={{ marginBottom: 30 }}>
                                            {
                                                receivedFeedbacks.map(feedback => (
                                                    <div  className="paper" key={feedback.id || feedback.recipient}>
                                                        <p><b>Sender  </b> :&nbsp; {feedback.sender}</p>
                                                        <p><b>Recipent </b> :&nbsp; {feedback.recipient}</p>
                                                        <p><b>Feedback  </b> :&nbsp; {feedback.feedback}</p>
                                                        
                                                        <p><b>Recieved time  </b> :&nbsp;  {feedback.createdAt}</p>
                                                        
                                                        
                                                    </div>
                                                ))
                                            }
                                            <br />
                                        </div>
                                        <br />
                                    </div>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div>
                                    <div >
                                        <h1>Sent Feedbacks</h1>
                                        <Container>
                                        <div  style={{ marginBottom: 30 }}>
                                                {
                                                    sentFeedbacks.map(feedback => (
                                                        <div className="paper" key={feedback.id || feedback.recipient}>
                                                            <div >   
                                                                    <p><b>Sent To</b>: {feedback.recipient}</p>                  
                                                                    <p><b>Feedback</b>: {feedback.feedback}</p>
                                                                    <p><b>Sent Time</b>: {feedback.createdAt}</p>
                                                                               
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                
                                            </div>
                                            </Container>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            
            
            </div>
             </div>
                
    );
}
export default Feedback;