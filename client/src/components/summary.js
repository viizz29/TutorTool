import * as React from 'react';
import Box from '@mui/material/Box';


class Summary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      summary: {},
    };
    this.tkn = localStorage.getItem('token');
  }

  load_summary(){
    fetch("/api/summary", {
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
            summary: result
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
    this.load_summary();
  }

  render() { 
    const { error, isLoaded, summary} = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
      return (
       
              <Box component="fieldset" sx = {{width: 1}}>
                <legend>Summary</legend>
                Number of Batches: {summary.batch_count}
                <br/>
                Number of Students: {summary.student_count}
                <br/>
                Earning This Month: {summary.earning_this_month}
              </Box>  
          
      );
    }
  }        
}


export default Summary;