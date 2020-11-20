import React, {  useRef, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAuth } from "../../corp-auth.js";

const SignUp = (props) => {
  const formRef = useRef(null);
  let auth = useAuth();

  const [formValues, setFormValues] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  async function signUp() {
      await auth.signup(formValues.username, formValues.email, formValues.password, returnToMain, setFormErrors);
  };

  let returnToMain = () => {
    setFormValues({username: '', password: ''})
    setMessage("Success! You can Sign In now")
  }

  useEffect(() => {
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
    if (!formValues.username)
      errors.username = "Empty"
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
    <Form.Group controlId="formSignUpUsername">
      <Form.Label><small>Username*</small></Form.Label>
      <Form.Control
        size="sm"
        name="username"
        placeholder="username"
        onChange={handleChange}
        isInvalid={!!formErrors.username}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          Empty username
        </Form.Control.Feedback>
    </Form.Group>
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
  <div className="success-message">{message}</div>
  <div className="submit-button">
    <Button variant="green" type="submit" className="mt-1">
        Sign Up
    </Button>
  </div>
</Form>
  );
};

export default SignUp;
