import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



class Fees extends React.Component {
    constructor(props) {
      super(props);
      const params = new URLSearchParams(window.location.search);
      this.student_id = params.get('studentid');
      
      this.state = {
        error: null,
        isLoaded: false,
        name: "",
        fees: []
      };
    }
  
    componentDidMount() {
      fetch("/api/fees?batchid="+this.student_id)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState({
              isLoaded: true,
              name: result.name,
              fees: result.fees
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
      const { error, isLoaded, name, fees} = this.state;

      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('amount'),
        });
      }

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
                  FEES of {name}
                </Typography>
                  {fees.map(fee => (
                        <Card key={fee.id} sx={{mb: 4}}>
                            <CardContent>
                              <Typography variant="h5" component="div">
                                 paid Rs. {fee.amount} on {fee.date} ({fee.remark})
                              </Typography>
                              <Typography variant="body2">
                              
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small"
                              >Delete Record</Button>
                            </CardActions>
                          </Card>
                      ))}
               
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, display: 'flex'}}>
                    <TextField
                      margin="normal"
                      required
                      id="amount"
                      name="amount"
                      autoFocus
                      placeholder='amount'
                    />
                    
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ ml: 1}}
                    >
                      Register
                    </Button>
                    
                  </Box>
               
                    
              </Box>
        );
      }
    }
  }
export default Fees;
