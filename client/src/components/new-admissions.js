import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import CardMedia from '@mui/material/CardMedia';


class NewAdmissions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      new_admissions: {},
    };
    this.tkn = localStorage.getItem('token');
    
  }
  load_new_admission_list(){
    fetch("/api/new-admissions", {
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
            new_admissions: result
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
    this.load_new_admission_list();
  }

  render() { 
    const { error, isLoaded, new_admissions} = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
      return (
       
        <Box component="fieldset" >
        <legend>New Admission List</legend>
      
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {new_admissions.map(item => (
              <Grid item xs={2} sm={4} md={4} key={item.id}>
                <Card sx={{ display: 'flex' }} onClick={() => (window.open("/student?id="+item.id, "_self"))}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item.date}
                      </Typography>
                    </CardContent>
                    
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 50 }}
                    image={`api/dp?id=${item.id}&token=${this.tkn}`}
                    alt="DP"
                  />
                </Card>
              </Grid>
          ))}
      </Grid></Box>

          
      );
    }
  }        
}


export default NewAdmissions;