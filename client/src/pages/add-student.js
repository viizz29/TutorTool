import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
 
export default function AddStudent() {
  const [batch, setBatch] = React.useState({});
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const batch_id = (new URLSearchParams(window.location.search)).get('batchid');

    const data = new FormData(event.currentTarget);
    
    axios.post('/api/add-student', {
      batchid: batch_id,
      name: data.get('name'),
      school: data.get('school'),
      standard: data.get('standard'),
      phone: data.get('phone'),
      email: data.get('email'),
      fee: data.get('fee'),
      admission_date: data.get('admission_date')
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      }
    })
    .then(function (response) {

      window.open("/students?batchid="+batch_id, "_self");
    })
    .catch(function (error) {
      console.log(error);
    });
  };


  const loadBatchDetails = () => {
    const token = localStorage.getItem('token');
    const batch_id = (new URLSearchParams(window.location.search)).get('batchid');

      fetch("/api/batch?id="+ batch_id, {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            setBatch(result);
          },
        
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
  

  useEffect(() => {
    loadBatchDetails();
    return () => {};
  }, []);
  


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
            Add Student to {batch.title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="school"
              label="Full School"
              name="school"
              autoComplete="school"
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
              name="phone"
              label="phone"
              id="phone"
              type="number"
              autoComplete="phone"
            />
            <TextField
              margin="normal"
              fullWidth
              name="email"
              label="Email Address"
              id="email"
              autoComplete="email"
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
                <legend>Admission Date</legend>
                <TextField
              required
              fullWidth
              name="admission_date"
              id="admission_date"
              type="date"
              autoComplete="admission_date"
            />
              </Box>
            

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
