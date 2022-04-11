import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { registrationRequest } from '../apiRequests/UserRequests';

export default function Registration(props) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  function handleSuccessfulAuth(data) {
    props.handleLogin(data);
    navigate('/');
  }

  async function formSubmit() {
    const response = await registrationRequest(
      state.email,
      state.password,
      state.password_confirmation,
    );
    const { data: { status, errors } } = response;
    if (status === 201) {
      handleSuccessfulAuth(response.data);
    }
  }

  function handleChange(event) {
    const { target: { value, name } } = event;
    setState({
      ...state,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    formSubmit();
    event.preventDefault();
  };

  return (
    <Container>
      <Typography variant="h1" className="text-center">
        Registration
      </Typography>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" name="email" onChange={handleChange} />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" name="password" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" name="password_confirmation" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
}
