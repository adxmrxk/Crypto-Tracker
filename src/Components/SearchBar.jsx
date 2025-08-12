import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

export default function FullWidthTextField() {
  return (
    <Box sx={{ width: 500, maxWidth: '100%', marginTop: 2 }}>
      <TextField
        fullWidth
        label="Search A Crypto Currency"
        id="SearchACryptoCurrency"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>

  );
}