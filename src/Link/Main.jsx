import { Grid, Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

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
          <form>
            <TextField fullWidth label="Insert link" id="base_link" name="base_link" onChange={handleIdeaChange} />
            <Button fullWidth variant="outlined" color="success" size="large" className="mt-1" type="submit">
              Short It!
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
