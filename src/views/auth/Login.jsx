import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { Form, Button, Container } from 'react-bootstrap';
import { loginRequest } from '../../requests/apiRequests/UserRequests';

export default function Login(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  function handleSuccessfulAuth(data) {
    navigate('/');
    props.handleLogin(data);
  }

  async function formSubmit() {
    const response = await loginRequest(state.email, state.password);
    const { data: { status } } = response;
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
        Login
      </Typography>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" name="password" onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </Container>
  );
}
