import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches({marginLeft, marginRight, marginTop, checked, onChange}) {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      sx={{ ml: marginLeft, mr: marginRight, mt: marginTop }}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}