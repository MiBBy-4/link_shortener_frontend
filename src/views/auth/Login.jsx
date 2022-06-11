import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  Grid,
} from '@mui/material';
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

  function formSubmit() {
    loginRequest(state.email, state.password, handleSuccessfulAuth);
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '50vh' }}
    >
      <Grid item xs={3}>
        <Box
          sx={{
            width: 1000,
            maxWidth: '100%',
          }}
        >
          <Typography variant="h1" className="text-center">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <Input id="email" aria-describedby="my-helper-text" name="email" placeholder="Email" onChange={handleChange} />
              <FormHelperText id="email">We&apos;ll never share your email.</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <Input id="password" aria-describedby="password" type="password" name="password" placeholder="Password" className="mt-2" onChange={handleChange} />
            </FormControl>
            <Button variant="primary" type="submit">Login</Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
