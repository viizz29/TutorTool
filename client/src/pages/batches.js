import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

class Batches extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        batches: []
      };
      this.tkn = localStorage.getItem('token');
    }
  
    componentDidMount() {
      fetch("/api/batches", {
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
              batches: result
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
      const { error, isLoaded, batches } = this.state;
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
                  BATCHES
                </Typography>
                
                  {batches.map(batch => (
                        <Card key={batch.id} sx={{mb: 4}}>
                            <CardContent>
                              <Typography variant="h5" component="div">
                                {batch.title}
                              </Typography>
                              <Typography variant="body2">
                              {batch.subject} on {batch.title} for standard {batch.standard}
                               
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small"
                              onClick={() => (window.open("/batch?id="+batch.id, "_self"))}
                              >Open</Button>
                            </CardActions>
                          </Card>
                      ))}
                
                <Button variant="contained" color="success" sx={{ mt: 1, ml: 1}}
                onClick={() => (window.open("/add-batch", "_self"))}
                  >Start New Batch</Button>
              </Box>            
        );
      }
    }
  }
  

export default Batches;