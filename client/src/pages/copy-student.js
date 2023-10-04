import * as React from 'react';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 

export default function CopyStudent() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
  }

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
            Copy Student
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value="10"
            label="Batch"
            onChange={handleChange}
            >
            <MenuItem value={10}>STD 11 PHYSICS</MenuItem>
            <MenuItem value={20}>STD 12 CHEMISTRY</MenuItem>
            <MenuItem value={30}>STD 10 SCIENCE</MenuItem>
            </Select>
        </FormControl>
        
        <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
            <InputLabel id="demo-simple-select-label">Student</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value="10"
            label="Student"
            onChange={handleChange}
            >
            <MenuItem value={10}>Suraj</MenuItem>
            <MenuItem value={20}>Pinki</MenuItem>
            <MenuItem value={30}>Rahul</MenuItem>
            </Select>
        </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enroll
            </Button>
          </Box>
        </Box>
  );
}
