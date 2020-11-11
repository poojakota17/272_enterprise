import React, { useRef, useState, useEffect } from 'react';
import { API } from 'aws-amplify';


import bsCustomFileInput from 'bs-custom-file-input';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import MemePreview from './memePreview';
import MemeUrl from './memeUrl';

export default function MemeForm(props) {
  const initialState = {positionx: 'left', positiony: 'bottom', color: '#F9F7F7'};
  const [memeData, setMemeData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [link, setLink] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitChanges();
    }
  }, [formErrors]);

  async function submitChanges(event) {
    console.log(memeData);
    createMeme();
    // do smth
  }

  function createMeme() {
    setLink(<Spinner animation="border" />);
    const apiName = 'updatememe';
    const path = '/newmeme';
    const myInit = {
    'queryStringParameters': memeData
    };
    console.log(myInit);
    API.get(apiName, path, myInit)
      .then(response => {
        console.log(response);
        setLink(< MemeUrl link={response}/>);
      })
      .catch(error => {
        console.log(error.response);
     });
  }

  const resetForm = () => {
    setMemeData(initialState);
    setIsSubmitting(false);
    setFormErrors({});
    setLink(null);
    formRef.current.reset();
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setMemeData({ ...memeData, [name]: value });
  }

  function validate () {
     let errors = {};
     if (!memeData.pic) {
       errors.pic = "You didn't choose the pic";
     }
     return errors;
   };

  function handleSubmit (event) {
    event.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <>
    <Row>
      <Col sm={6} className="preview-div">{memeData.pic ? < MemePreview {...memeData}/> : <h3>Select your pic first</h3>}</Col>
      <Col sm={6}>
        <Form onSubmit={handleSubmit} ref={formRef} noValidate>
        <Form.Group onChange={handleChange}>
          <Row className="pics-row">
            {['dog', 'dog2', 'dog3', 'dog4', 'dog5', 'dog6'].map((name) => (
              <Col sm={"auto"} key={`${name}`} className="pics-col">
                <Form.Check required type="radio" id={`check-api-${name}`}>
                    <Form.Check.Input type="radio" name="pic" value={name}/>
                    <Form.Check.Label>
                      <Image src={process.env.REACT_APP_CF + `${name}.jpeg`}
      className="pics" rounded />
                    </Form.Check.Label>
                </Form.Check>
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="selectPositionY" onChange={handleChange}>
              <Form.Label>Vertical Position:</Form.Label>
              <Form.Control as="select" name="positiony">
                <option value="BOTTOM">Bottom</option>
                <option value="MIDDLE">Center</option>
                <option value="TOP">Top</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="selectPositionX" onChange={handleChange}>
              <Form.Label>Horizontal Position:</Form.Label>
              <Form.Control as="select" name="positionx">
                <option value="LEFT">Left</option>
                <option value="CENTER">Center</option>
                <option value="RIGHT">Right</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="textControl" className="m-0">
              <Form.Label>Text:</Form.Label>
              <Form.Control as="textarea" rows={1} placeholder="Add text" name="text" onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="colorControl" className="m-0">
              <Form.Label>Color:</Form.Label>
              <Form.Control type="color" name="color" value={memeData.color} onChange={handleChange}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-between mt-3">
          <Col sm={"auto"}>
            <Button variant="submit" type="submit">
               Generate Meme
            </Button>
          </Col>
          <Col sm={"auto"}>
          <Button variant="reset" onClick={resetForm}>
             Reset Form
          </Button>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
    <Row className="justify-content-center m-5">{link}</Row>
    </>
  );
}
