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
import { Link } from 'react-router-dom';


export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='fixed bottom-0 left-0 w-full z-50'>
        <BottomNavigation sx={{ background: 'linear-gradient(to right, #2b2a2a, #636060)'}} value={value} onChange={handleChange}> 
          <BottomNavigationAction
            component={Link}
            to="/HomePage"
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
            component={Link}
            to="/ChatRoomPage"
            label="Chat"
            value="Chat"
            icon={<FeedIcon />}
            sx={{
                color: 'gray',
                '&.Mui-selected': {
                color: 'white',
                },
            }}/>
        
          <BottomNavigationAction
            component={Link}
            to="/PortfolioPage"
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
              component={Link}
              to="/SettingsPage/AccountSettings"
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