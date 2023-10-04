import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';


class Batch extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    this.batch_id = params.get('id');
    this.state = {
      error: null,
      isLoaded: false,
      batch: {}
    };
    this.tkn = localStorage.getItem('token');
  }
  
  componentDidMount() {
    fetch("/api/batch?id="+this.batch_id, {
      method: 'GET',
      headers: {
        'x-access-token': this.tkn,
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            batch: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
    render() {
      const { error, isLoaded, batch } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
           
             
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >

              <Typography component="h1" variant="h3">
                  {batch.title} BATCH
              </Typography>
                
              <Box component="fieldset" sx = {{width: 1}}>
                <legend>Details</legend>
                Subject: {batch.subject} <br/>
                Standard: {batch.standard} <br/>
                Started On: {batch.started_on} <br/>
                Monthly Fee: {batch.fee} <br/>

              </Box>
                
                
                <Box sx={{ display: 'flex'}}>
                  
                  <Button variant="contained" color="success" sx={{ mt: 1}}
                  onClick={() => (window.open("/edit-batch?batchid="+batch.id, "_self"))}
                  >Edit Batch Details</Button>
                  
                  <Button variant="contained" color="error" sx={{ mt: 1, ml: 1}}
                  >Delete Batch</Button>

                  <Button variant="contained" sx={{ mt: 1, ml: 1}}
                  onClick={() => (window.open("/students?batchid="+batch.id, "_self"))}>Open Student List</Button>
                
                </Box>
              </Box>
             
           
        );
      }
    }
  }
  

export default Batch; 
