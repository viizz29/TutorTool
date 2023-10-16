import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

 
class Students extends React.Component {
    constructor(props) {
      super(props);
      const params = new URLSearchParams(window.location.search);
      this.batch_id = params.get('batchid');
      
      this.state = {
        error: null,
        isLoaded: false,
        batch: {},
        students: []
      };
      this.tkn = localStorage.getItem('token');
    }
  
    loadBatchDetails(){
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
         
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }

    loadStudents(){
      fetch("/api/students?batchid="+this.batch_id, {
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
              students: result
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
        );
    }

    componentDidMount() {
      this.loadBatchDetails();
      this.loadStudents();
    }
  
    render() {
      const { error, isLoaded, batch, students } = this.state;
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
                  STUDENTS of {batch.title}
                </Typography>
                
                {students.map(student => (
                        <Card key={student.id} sx={{mb: 4}}>
                            <CardContent>
                              <Typography variant="h5" component="div">
                                {student.name}
                              </Typography>
                              <Typography variant="body2">
                              {student.school} 
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small"
                              onClick={() => (window.open("/student?id="+student.id, "_self"))}
                              >Open</Button>
                            </CardActions>
                          </Card>
                      ))}

                <Box sx={{ display: 'flex'}}>
                  
                  <Button variant="contained" color="success" sx={{ mt: 1}}
                  onClick={() => (window.open("/add-student?batchid="+this.batch_id, "_self"))}
                  >Add Student</Button>
                  
                  <Button variant="contained" color="success" sx={{ mt: 1, ml: 1}}
                  onClick={() => (window.open("/copy-student?batchid="+this.batch_id, "_self"))}
                  >Copy Student</Button>


                </Box>
                
              </Box>   
          
        );
      }
    }
  }
  

export default Students;
