import { Grid, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { postLink } from '../apiRequests/LinkRequests';

export default function Main() {
  const [link, setLink] = useState({
    base_link: '',
  });

  function handleIdeaChange(event) {
    const { target: { value, name } } = event;
    setLink({
      ...link,
      [name]: value,
    });
  }

  async function formSubmit(formData) {
    const data = new FormData(formData);
    const response = await postLink(data);
    console.log(response);
  }

  const handleSubmit = (event) => {
    formSubmit(event.target);
    event.preventDefault();
  };

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
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Insert link" id="base_link" name="base_link" onChange={handleIdeaChange} />
              <Button fullWidth variant="outlined" color="success" size="large" className="mt-1" type="submit">
                Short It!
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
