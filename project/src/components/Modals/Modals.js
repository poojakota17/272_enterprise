import React, { useState } from 'react';
import { Modal, Button, Form, Dropdown, ButtonGroup, Alert } from 'react-bootstrap';
//import { Alerts } from '../components/Alerts';

const Modals = (props) => {

    //let res = false;
    let position = 'abcd';
    let salary = '0';
    //let showalert = false;

    const myChangeHandler = (e) => {
        salary = e.target.value
        console.log(salary)
    }
    const handleSelect = (e) => {
        //setposition(e.target.innerText)
        console.log(e.target.innerText)
        position = e.target.innerText;
        console.log(position)
    }
    // const handleClose = () => {
    //     showalert = false
    // }
    const handlebutton = (e) => {
        console.log("hellobutton", e)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", props.token)
        myHeaders.append("Content-Type", "application/json");
        fetch('https://ypqntn5a8c.execute-api.us-east-1.amazonaws.com/dev/items', {
            method: 'PUT',
            body: JSON.stringify({
                "salary": salary,
                "position": `${position}`,
                "empno": `${props.empno}`

            }),
            headers: myHeaders,
            redirect: 'follow'
        })
            .then(response => response.text())
            // res = true;
            // showalert = true;
            // console.log("response", res)

            .then(response => alert("Successfully Updated"))
            .catch(error => console.log(error));
    }

    return (
        <>
            {/* <Alerts show={showalert} Close={handleClose} /> */}
            <Modal
                show={props.show}
                onHide={props.close}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.text}
                    <Form.Group>
                        <Form.Control as="textarea" rows={1} type="text" onChange={myChangeHandler} placeholder="Update Salary" />
                    </Form.Group>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="warning">Update Position</Button>

                        <Dropdown.Toggle split variant="warning" id="dropdown-split-basic" />

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Manager" onClick={handleSelect}>Manager</Dropdown.Item>
                            <Dropdown.Item eventKey="Senior Engineer" onClick={handleSelect} >Senior Engineer</Dropdown.Item>
                            <Dropdown.Item eventKey="Assistant Engineer" onClick={handleSelect}>Assistant Engineer</Dropdown.Item>
                            <Dropdown.Item eventKey="Technical Engineer" onClick={handleSelect}>Technical Engineer</Dropdown.Item>
                            <Dropdown.Item eventKey="Senior Staff" onClick={handleSelect}>Senior Staff</Dropdown.Item>
                            <Dropdown.Item eventKey="Staff" onClick={handleSelect}>Staff</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={props.close}>
                        Close
          </Button>
                    <Button variant="success" onClick={handlebutton} >Update</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default Modals;