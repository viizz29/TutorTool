import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function AddBatch() {
  const tkn = localStorage.getItem('token');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('/api/add-batch', {
      title: data.get('title'),
      subject: data.get('subject'),
      standard: data.get('standard'),
      fee: data.get('fee'),
      startedon: data.get('startedon')
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': tkn,
      }
    })
    .then(function (response) {
      window.open("/batches", "_self");
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Batch
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Batch Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="subject"
              label="subject"
              id="subject"
              autoComplete="subject"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="standard"
              label="standard"
              id="standard"
              autoComplete="standard"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="fee"
              label="fee"
              id="fee"
              type="number"
              autoComplete="fee"
            />

            <Box component="fieldset" sx = {{width: 1}}>
                <legend>Started On</legend>
                <TextField
              required
              fullWidth
              name="startedon"
              id="startedon"
              type="date"
              autoComplete="Started On"
            />
              </Box>
            
            

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
     
  );
}
