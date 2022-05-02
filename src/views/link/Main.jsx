import {
  Grid,
  Button,
  Typography,
  Alert,
  AlertTitle,
  FormControl,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postLink } from '../../requests/apiRequests/LinkRequests';

export default function Main() {
  const [link, setLink] = useState({
    base_link: '',
    description: '',
  });
  const [tags, setTags] = useState([]);

  const isLoggedIn = useSelector((status) => status.status.isLoggedIn);
  const navigate = useNavigate();

  function handleIdeaChange(event) {
    const { target: { value, name } } = event;
    setLink({
      ...link,
      [name]: value,
    });
  }

  function handleSuccessfulPost() {
    navigate('/links');
  }

  function formSubmit(formData) {
    const data = new FormData(formData);
    postLink(data, tags, handleSuccessfulPost);
  }

  function handleSubmit(event) {
    formSubmit(event.target);
    event.preventDefault();
  }

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
            { !isLoggedIn &&
              <Alert severity="warning" className="my-3">
                <AlertTitle>Not logged in!</AlertTitle>
                To short your link you should
                <strong> log in</strong>
              </Alert> }
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <TextField
                  className="mb-3"
                  fullWidth
                  label="Insert link"
                  id="base_link"
                  name="base_link"
                  onChange={handleIdeaChange}
                />
                <TextField
                  className="mb-3"
                  fullWidth
                  label="Insert description"
                  multiline
                  maxRows={4}
                  id="description"
                  name="description"
                  onChange={handleIdeaChange}
                />
                <div className="tags-input-container mb-3">
                  { tags.map((tag, index) => (
                    <div className="tags-item" key={index}>
                      <span className="text">{tag}</span>
                      <span className="close" onClick={() => removeTag(index)}>&times;</span>
                    </div>
                  ))}
                  <input type="text" onKeyDown={handleKeyDown} placeholder="Type something" className="text-input" />
                </div>
                { isLoggedIn &&
                  <Button fullWidth variant="outlined" color="success" size="large" type="submit">
                    Short It!
                  </Button> }
              </FormControl>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
