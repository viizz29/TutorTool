import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

class Student extends React.Component {
    constructor(props) {
      super(props);
      const params = new URLSearchParams(window.location.search);
      this.student_id = params.get('id');
      this.state = {
        error: null,
        isLoaded: false,
        student: {}
      };
      this.tkn = localStorage.getItem('token');
    
    }
  
    componentDidMount() {
      fetch("/api/student?id="+this.student_id, {
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
              student: result
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
      const { error, isLoaded, student } = this.state;
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
                  {student.name}
                </Typography>

                <Box component="fieldset" sx = {{width: 1}}>
                  <legend>Details</legend>
                  Standard: {student.standard} <br/>
                  Fee: {student.fee} <br/>
                  Admission Date: {student.admission_date} <br/>
              </Box>

                <Button variant="contained" sx={{ mt: 3}}
                  onClick={() => (window.open("/fees?studentid="+student.id, "_self"))}>SEE FEE RECORDS</Button>
                <Box sx={{ display: 'flex'}}>
                  
                  <Button variant="contained" color="success" sx={{ mt: 1}}
                  onClick={() => (window.open("/edit-student?studentid="+student.id, "_self"))}
                  >Edit Details</Button>
                  
                  <Button variant="contained" color="error" sx={{ mt: 1, ml: 1}}
                  >Delete Student</Button>
                </Box>
              </Box>   
        );
      }
    }
  }
  

export default Student;
