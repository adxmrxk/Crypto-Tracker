import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ButtonComponent() {
  return (
    <div>
        <Stack spacing={2} direction="row">
          <div className='fixed right-10 flex gap-3'>
              <Button variant="contained" sx = {{backgroundColor: '#325ea8'}}>Log In</Button> 
              <Button variant="contained" sx = {{backgroundColor: '#325ea8'}}>Sign Up</Button>
          </div>
        </Stack>
    </div>
  );
}