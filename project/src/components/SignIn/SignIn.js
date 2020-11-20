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

  const [formValues, setFormValues] = useState({username: '', password: ''});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  let { from } = location.state || { from: { pathname: "/" } };

  async function signIn() {
      await auth.login(formValues.username, formValues.password, returnToMain, setFormErrors);
  };

  let returnToMain = () => {
    setFormValues({username: '', password: ''})
    history.replace(from);
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting)
        signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);


    function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function validate() {
    let errors = {};
    if (!formValues.username)
      errors.username = 'Add username'
    if (!formValues.password)
      errors.password = 'Add password'
    //if (!(/^[a-zA-Z0-9.]+@[tT]ech[cC]orp.com$/.test(formValues.email)))
      //errors.email = 'Wrong email format'
    return errors;
  }

  function handleSubmit (event) {
    event.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <Form className="auth-form" onSubmit={handleSubmit} ref={formRef} noValidate>
  <Form.Group controlId="formUsernameIn">
    <Form.Label><small>Username*</small></Form.Label>
    <Form.Control
      size="sm"
      name="username"
      placeholder="Username"
      onChange={handleChange}
      isInvalid={!!formErrors.username}
      />
      <Form.Control.Feedback type="invalid" tooltip>
        Empty username
      </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="formBasicPasswordIn">
    <Form.Label><small>Password*</small></Form.Label>
    <Form.Control
      size="sm"
      name="password"
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
</Form>);
};

export default SignIn;
