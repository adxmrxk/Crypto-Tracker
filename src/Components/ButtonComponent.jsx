import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

/**
 * ButtonComponent - A customizable Material UI button.
 * 
 * Props:
 * - text: string (label inside the button)
 * - onClick: function (callback triggered on click)
 * - sx: object (optional custom styling)
 * - size: string ("small", "medium", "large" - defaults to "small")
 */
export default function ButtonComponent({text, onClick, sx = {}, className = '', backGroundColor_, fontSize_, padding_, minWidth_, textColor_}) {
  return (
    <Stack spacing={2} direction="row">
      <div>
        <Button variant="contained" className={className} onClick={onClick} sx={{
            backgroundColor: backGroundColor_,
            color: textColor_,
            fontSize: fontSize_,
            padding: padding_,
            minWidth: minWidth_,
            fontFamily: 'Roboto, sans-serif',
            ...sx,
          }}>
          {text}
        </Button>
      </div>
    </Stack>
  );
}
