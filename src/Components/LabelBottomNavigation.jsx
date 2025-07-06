import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='fixed bottom-0 left-0 w-full z-50'>
        <BottomNavigation sx={{ backgroundColor: '#424242'}} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Home"
            value="Home"
            icon={<HomeIcon />}
            sx={{
                color: 'gray',
                '&.Mui-selected': {
                color: 'white',
                },
            }}/>
          <BottomNavigationAction
            label="News"
            value="News"
            icon={<FeedIcon />}
            sx={{
                color: 'gray',
                '&.Mui-selected': {
                color: 'white',
                },
            }}/>
        
          <BottomNavigationAction
            label="Portfolio"
            value="Portfolio"
            icon={<PieChartIcon />}
            sx={{
              color: 'gray',
              '&.Mui-selected': {
                color: 'white',
              },
            }}/>

          <BottomNavigationAction
            label="Markets"
            value="Markets"
            icon={<BarChartIcon />}
            sx={{
              color: 'gray',
              '&.Mui-selected': {
                color: 'white',
              },
            }}/>

            <BottomNavigationAction
              label="Settings"
              value="Settings"
              icon={<SettingsIcon />}
              sx={{
                  color: 'gray',
                  '&.Mui-selected': {
                  color: 'white',
                  },
            }}/>

        </BottomNavigation>
    </div>
  );
}