import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import CardMedia from '@mui/material/CardMedia';


class PendingFees extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pending_fees: {},
    };
    this.tkn = localStorage.getItem('token');
  }

  load_pending_fees(){
    
    fetch("/api/pending-fees",{
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
            pending_fees: result
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


 
  componentDidMount() {
    this.load_pending_fees();
  }

  render() { 
    const { error, isLoaded, pending_fees} = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
      return (
        <Box component="fieldset">
        <legend>Students Whose Fee is pending</legend>
      
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {pending_fees.map(item => (
              <Grid item xs={2} sm={4} md={4} key={item.id}>
              
                <Card sx={{ display: 'flex' }} onClick={() => (window.open("/student?id="+item.id, "_self"))}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item.last_payment} {item.amount}
                      </Typography>
                    </CardContent>
                    
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={`api/dp?id=${item.uid}&token=${this.tkn}`}
                    alt="dp"
                  />
                </Card>
              </Grid>
          ))}
      </Grid></Box>

      
          
      );
    }
  }        
}


export default PendingFees;