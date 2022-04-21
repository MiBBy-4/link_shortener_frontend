import {
  Grid,
  Button,
  Typography,
  Alert,
  AlertTitle,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postLink } from '../../requests/apiRequests/LinkRequests';

export default function Main() {
  const [link, setLink] = useState({
    base_link: '',
    description: '',
  });
  const [tags, setTags] = useState([]);

  const isLoggedIn = useSelector((status) => status.isLoggedIn);
  const navigate = useNavigate();

  function handleIdeaChange(event) {
    const { target: { value, name } } = event;
    setLink({
      ...link,
      [name]: value,
    });
  }

  async function formSubmit(formData) {
    const data = new FormData(formData);
    const response = await postLink(data, tags);
    const { data: { status } } = response;
    if (status === 201) {
      navigate('/links');
    }
  }

  const handleSubmit = (event) => {
    formSubmit(event.target);
    event.preventDefault();
  };

  function handleKeyDown(event) {
    if (event.key !== 'Enter') return;
    const { target: { value } } = event;
    if (value.trim() === '') return;
    setTags([...tags, value]);
    event.target.value = '';
  }

  function removeTag(index) {
    setTags(tags.filter((tag, i) => i !== index));
  }

  return (
    <div>
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
            <Typography variant="h3" className="text-center">Link Shortener — short your link in one click</Typography>
            <Typography variant="h5" className="text-center">
              Also you can check all shorted links in our
              {' '}
              <a href="/links">table</a>
            </Typography>
            { isLoggedIn ? (null) : (
              <Alert severity="warning" className="my-3">
                <AlertTitle>Not logged in!</AlertTitle>
                To short your link you should
                <strong> log in</strong>
              </Alert>
            ) }
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Insert link" id="base_link" name="base_link" onChange={handleIdeaChange} />
              <Form.Group className="mt-1">
                <Form.Control as="textarea" rows={3} placeholder="Description of Link" name="description" onChange={handleIdeaChange} />
              </Form.Group>
              <Form.Group className="mt-1">
                <div className="tags-input-container">
                  { tags.map((tag, index) => (
                    <div className="tags-item" key={index}>
                      <span className="text">{tag}</span>
                      <span className="close" onClick={() => removeTag(index)}>&times;</span>
                    </div>
                  ))}
                  <input type="text" onKeyDown={handleKeyDown} placeholder="Type something" className="text-input" />
                </div>
              </Form.Group>
              { isLoggedIn ? (
                <Button fullWidth variant="outlined" color="success" size="large" className="mt-1" type="submit">
                  Short It!
                </Button>
              ) : (null) }
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
