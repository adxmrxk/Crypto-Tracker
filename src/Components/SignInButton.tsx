import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function SignInButton({buttonClick, borderColor, textColor}) {

  

  return (
    <Stack direction="row">
      <div className='cursor-pointer'>
          <Chip onClick={buttonClick} label = "Sign up for a free account" variant= 'outlined' sx = { { border: `1px solid ${borderColor}`, color: textColor, fontSize: '1.45rem', px: 2, py: 2, width: 'fit-content', mt: 5} }></Chip>
      </div>
    </Stack>
  );
}