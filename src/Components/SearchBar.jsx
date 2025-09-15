import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

export default function FullWidthTextField({onClick, onChange}) {
  return (
    <Box sx={{ width: 500, maxWidth: '100%', paddingTop: 5, marginBottom: 10}} onChange = {onChange}>
      <TextField
        onClick={onClick}
        variant="outlined"
        fullWidth
        label="Search A Crypto Currency"
        id="SearchACryptoCurrency"
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{
          "& .MuiOutlinedInput-root": { color: "#f5f5f5", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#f5f5f5" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#bbbbbb" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "transparent", borderImage: "linear-gradient(to right, #42a5f5, #478ed1) 1" } },
          "& .MuiInputLabel-root": { color: "#f5f5f5" },
          "& .MuiSvgIcon-root": { color: "#f5f5f5" }
        }}
      />
    </Box>
  );
}
