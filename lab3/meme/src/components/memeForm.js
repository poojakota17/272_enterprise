import React, { useRef, useState, useEffect } from 'react';
import bsCustomFileInput from 'bs-custom-file-input';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import MemePreview from './memePreview';


export default function MemeForm(props) {
  const initialState = {position: 'bottom', color: '#F9F7F7', fontSize: '1'};
  const [memeData, setMemeData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submitChanges();
    }
  }, [formErrors]);

  function submitChanges(event) {
    console.log(memeData);
    resetForm();
    // do smth
  }

  const resetForm = () => {
    setMemeData(initialState);
    setIsSubmitting(false);
    setFormErrors({});
    formRef.current.reset();
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setMemeData({ ...memeData, [name]: value });
  }

  function validate () {
     let errors = {};
     /*if (formValues.filename && !regex.test(formValues.filename)) {
       errors.filename = "Invalid filename format";
     }
     if (formValues.file) {
       if (formValues.file.name !== currentItem.filename)
         errors.file = "Looks like you chose completely different file... Try again!"
       else if (formValues.file.size > 10 * 1024 * 1024)
         errors.file = "This file is too big. Max size is 10Mb";
       }*/
     return errors;
   };

  function handleSubmit (event) {
    event.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <>
    <Form onSubmit={handleSubmit} ref={formRef} noValidate>
      <Form.Group onChange={handleChange}>
      <Row>
        {['dog', 'dog2', 'dog3', 'dog4', 'dog5', 'dog6'].map((name) => (
          <Col sm={4} key={`${name}`} className="mt-3">
            <Form.Check type="radio" id={`check-api-${name}`}>
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

      <Form.Group controlId="selectControl" onChange={handleChange}>
        <Form.Label>Choose position</Form.Label>
        <Form.Control as="select" name="position">
          <option value="bottom">Bottom</option>
          <option value="top">Top</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="colorControl" className="m-0">
        <Form.Label>Choose the color</Form.Label>
          <Form.Control type="color" name="color" value={memeData.color} onChange={handleChange}/>
      </Form.Group>

      <Form.Group controlId="fontSizeControl">
       <Form.Label>Chose Font Size</Form.Label>
       <Form.Control type="range" min="1" max="12" name="fontSize" value={memeData.fontSize} onChange={handleChange}  custom/>
     </Form.Group>

      <Form.Group controlId="textControl" className="m-0">
          <Form.Label>Add text</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="Add text" name="text" onChange={handleChange} />
      </Form.Group>

    <Button variant="secondary" type="submit">
       Submit
    </Button>
    </Form>
    {memeData.pic ? < MemePreview {...memeData}/> : 'Select your pic'}
    </>
  );
}
