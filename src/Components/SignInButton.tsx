import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function SignInButton() {

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row">
      <div className='cursor-pointer'>
          <Chip onClick={handleClick} label = "Sign up for a free account" variant= 'outlined' sx = { { border: '1px solid #000000', fontSize: '1.45rem', padding: '0.5', width: 'fit-content', mt: 5} }></Chip>
      </div>
    </Stack>
  );
}