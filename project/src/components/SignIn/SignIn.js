import React, {  useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAuth } from "../../corp-auth.js";
import {
  useHistory,
  useLocation
} from "react-router-dom";

//import './NavBar.css';

const SignIn = (props) => {
  const formRef = useRef(null);
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  let { from } = location.state || { from: { pathname: "/" } };

  async function signIn() {
      await auth.login(formValues.email, formValues.password, returnToMain, setFormErrors);
  };

  async function federatedSignIn() {
    await auth.federated();
  }

  let returnToMain = () => {
    history.replace(from);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting)
        signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);


    function handleChange(event) {
    const { type, value } = event.target;
    setFormValues({ ...formValues, [type]: value });
  }

  function validate() {
    let errors = {};
    if (!(/^[a-zA-Z0-9.]+@[tT]ech[cC]orp.com$/.test(formValues.email)))
      errors.email = 'Wrong email format'
      console.log(errors)
    return errors;
  }

  function handleSubmit (event) {
    event.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  };

  return (<>
    <Button variant="green" onClick={federatedSignIn} className="mt-1">
        okta
    </Button>
    <Form className="auth-form" onSubmit={handleSubmit} ref={formRef} noValidate>
  <Form.Group controlId="formBasicEmail">
    <Form.Label><small>Email*</small></Form.Label>
    <Form.Control
      size="sm"
      type="email"
      placeholder="email@techcorp.com"
      onChange={handleChange}
      isInvalid={!!formErrors.email}
      />
      <Form.Control.Feedback type="invalid" tooltip>
        Wrong email format
      </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label><small>Password*</small></Form.Label>
    <Form.Control
      size="sm"
      type="password"
      placeholder="Password"
      onChange={handleChange}
      isInvalid={!!formErrors.password}/>
      <Form.Control.Feedback type="invalid" tooltip>
        Wrong email or password
      </Form.Control.Feedback>
  </Form.Group>
  <div className="submit-button">
    <Button variant="green" type="submit" className="mt-1">
        Sign In
    </Button>
  </div>
</Form>
  </>);
};

export default SignIn;
