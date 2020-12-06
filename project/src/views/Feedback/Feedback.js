import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Modal, Container, Row, Card, Alert, Col, Collapse, Form, Navbar, Nav, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Feedback.css';
import { listFeedbacks } from '../../graphql/queries';
import { FaTwitter } from "react-icons/fa";
import { NavBar } from '../../components/NavBar';
import { FiTwitch, FiTrash, FiEdit2 } from "react-icons/fi";
import { createFeedback as createFeedbackMutation, updateFeedback as updateFeedbackMutation, deleteFeedback as deleteFeedbackMutation } from '../../graphql/mutations';
const initialFormState = { recipient: '', feedback: '', sender: '' }

function Feedback(props) {

    const [feedbacks, setFeedbacks] = useState([]);
    const [receivedFeedbacks, setReceivedFeedbacks] = useState([]);
    const [sentFeedbacks, setSentFeedbacks] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    async function fetchFeedbacks() {
        const apiData = await API.graphql({ query: listFeedbacks });
        //console.log("props in feedback",props)
        //console.log("apidata", apiData)
        setFormData({ ...formData, sender: props.currentUser.signInUserSession.idToken.payload.email });
        console.log("formdata.sender",formData.sender) 
        const inboxres = apiData.data.listFeedbacks.items.filter(item => item.recipient === formData.recipient);
         console.log("inbox res ", inboxres);
        setReceivedFeedbacks(inboxres);
        const sentres = apiData.data.listFeedbacks.items.filter(item => item.sender === formData.sender);
        setSentFeedbacks(sentres);
         console.log("sent res", sentres);
    }

    async function createFeedback() {
        if (!formData.recipient || !formData.feedback) return;
        //console.log("in create feedback")
        await API.graphql({ query: createFeedbackMutation, variables: { input: formData } });
        setFeedbacks([...feedbacks, formData]);
        setFormData(initialFormState);
        window.alert(" Feedback sent ")
        // console.log("DOne creating!")

    }
    async function deleteFeedback({ id }) {
        const newFeedbacksArray = feedbacks.filter(feedback => feedback.id !== id);
        setFeedbacks(newFeedbacksArray);
        await API.graphql({ query: deleteFeedbackMutation, variables: { input: { id } } });
    }

    return (
        <div>
            <NavBar />
            <div>
                <div className="title">
                    <h1>Welcome to Feedback Portal</h1>
                    <p>Please click on "Create" to write the feedback to fellow peers</p>
                </div>
                <Button variant="primary" onClick={handleShow}>
                    Create &nbsp; <FiEdit2 />
                </Button>
                <br/>
                <Button variant="primary" onClick={fetchFeedbacks}> Reload </Button>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Please write a feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Write recipient email address (john.smith@techcorp.com)</Form.Label>
                                <Form.Control size="lg" type="email"
                                    onChange={e => setFormData({ ...formData, 'recipient': e.target.value })}
                                    placeholder="Recipient Email"
                                    value={formData.recipient}
                                />
                                <br />
                                <Form.Control as="textarea" rows={3}
                                    onChange={e => setFormData({ ...formData, 'feedback': e.target.value })}
                                    placeholder="Write a feedback"
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
                                    <Nav.Link eventKey="first" >Inbox <FiTwitch /></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" >Sent <FiTwitch />{fetchFeedbacks}</Nav.Link>
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
                                                        <div className="paper" key={feedback.id || feedback.recipient}>
                                                            <p><b>Sender  </b> :&nbsp; {feedback.sender}</p>
                                                            <p><b>Recipent </b> :&nbsp; {feedback.recipient}</p>
                                                            <p><b>Feedback  </b> :&nbsp; {feedback.feedback}</p>
                                                            <p><b>Recieved time  </b> :&nbsp;  {feedback.createdAt}</p>
                                                            <p><a href="https://twitter.com/"><FaTwitter/></a></p>
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
                                                <div style={{ marginBottom: 30 }}>
                                                    {
                                                        sentFeedbacks.map(feedback => (
                                                            <div className="paper" key={feedback.id || feedback.recipient}>
                                                                <div >
                                                                    <p><b>Sent To</b>: {feedback.recipient}</p>
                                                                    <p><b>Feedback</b>: {feedback.feedback}</p>
                                                                    <p><b>Sent Time</b>: {feedback.createdAt}</p>
                                                                    <p><a href="https://twitter.com/"><FaTwitter/></a></p>
                                                                    <Button variant="primary" onClick={() => deleteFeedback(feedback)}> <FiTrash /> </Button>
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

