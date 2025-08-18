import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickableChips( { text, varientType, sx} ) {
  

  return (
    <Stack direction="row" spacing={1}>
      <Chip label={text} variant={ varientType } sx = { { border: '1px solid #000000', fontSize: '1.0rem', padding: 0.5, width: 'fit-content'} }/>
    </Stack>
  );
}