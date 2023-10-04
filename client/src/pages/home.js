import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Summary from '../components/summary';
import NewAdmissions from '../components/new-admissions';
import RecentFees from '../components/recent-fees';
import PendingFees from '../components/pending-fees';

export default function Home(){
  const token = localStorage.getItem("token");
  return(
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >

          <Typography component="h1" variant="h5">Home</Typography>

          {token && (<div>
            <Summary/>
            <NewAdmissions/>
            
          </div>
          )
          }
          {!token && (
            <div>Hi, Welcome to the coaching management application, kindly login to your account to manage it. In case you do not have an account, then create it for free by clicking the signup button at the top right corner of this page.</div>
          )
          }
          
    </Box>
 
  );
}
