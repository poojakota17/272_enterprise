import React, {  useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAuth } from "../../corp-auth.js";
import {
  useHistory,
  useLocation
} from "react-router-dom";


const SignUp = (props) => {
  const formRef = useRef(null);
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  let { from } = location.state || { from: { pathname: "/" } };
  console.log(from)

  async function signUp() {
      await auth.signup(formValues.email, formValues.password, returnToMain, setFormErrors);
  };

  let returnToMain = () => {
    history.replace(from);
  }

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmitting)
        signUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);


    function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function validate() {
    let errors = {};
    if (!(/^[a-zA-Z0-9.]+@[tT]ech[cC]orp.com$/.test(formValues.email)))
      errors.email = 'Wrong email format'
    if (!formValues.password || formValues.password.length < 8)
      errors.password = 'Password should be at least 8 digits long'
    if (formValues.password !== formValues.confirm)
      errors.confirm = 'Password confirmation failed'
    return errors;
  }

  function handleSubmit (event) {
    event.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <Form className="auth-form" onSubmit={handleSubmit} ref={formRef} noValidate>
  <Form.Group controlId="formSignUpEmail">
    <Form.Label><small>Email*</small></Form.Label>
    <Form.Control
      size="sm"
      type="email"
      name="email"
      placeholder="email@techcorp.com"
      onChange={handleChange}
      isInvalid={!!formErrors.email}
      />
      <Form.Control.Feedback type="invalid" tooltip>
        Wrong email format
      </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="formSignUpPassword">
    <Form.Label><small>Password*</small></Form.Label>
    <Form.Control
      size="sm"
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      isInvalid={!!formErrors.password}/>
      <Form.Control.Feedback type="invalid" tooltip>
        {formErrors.password}
      </Form.Control.Feedback>
  </Form.Group>

  <Form.Group controlId="formSignUpConfirmPassword">
    <Form.Label><small>Confirm Password*</small></Form.Label>
    <Form.Control
      size="sm"
      type="password"
      name="confirm"
      placeholder="Password"
      onChange={handleChange}
      isInvalid={!!formErrors.confirm}/>
      <Form.Control.Feedback type="invalid" tooltip>
        {formErrors.confirm}
      </Form.Control.Feedback>
  </Form.Group>

  <div className="submit-button">
    <Button variant="green" type="submit" className="mt-1">
        Sign Up
    </Button>
  </div>
</Form>
  );
};

export default SignUp;
