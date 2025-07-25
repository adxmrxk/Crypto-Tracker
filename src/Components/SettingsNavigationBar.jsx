import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const pages = ['Account', 'Display', 'Notifications', 'Privacy'];
const settingsPages = ["/SettingsPage/AccountSettings", "/SettingsPage/Display",
                        "/SettingsPage/MockInvestingControls", "/SettingsPage/Notifications", 
                        "/SettingsPage/Privacy"
                        ];
//const settings = ['Profile', 'Account', 'Dashboard', 'CryptoScopeut'];                 

function SettingsNavigationBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  return (
    <div className='pt-6'>
      <motion.div initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: "easeOut"
            }}
            >
        <AppBar position="static">
          <Container maxWidth="xl" className='flex justify-center'>
            <Toolbar disableGutters className=''>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: '1.35rem'
                }}
              >
                CryptoScope
              </Typography>
              <Box sx={{display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu} component={Link}
                    to={settingsPages[index]}>
                      <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1,  }} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  justifyContent: 'center'
                }}
              >
                CryptoScope
              </Typography>
              <Box sx={{display: { xs: 'none', md: 'flex' } }}>
      
                {pages.map((page, index) => (
                  <Button
                    component={Link}
                    to={settingsPages[index]}
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>
    </div>
  );
}
export default SettingsNavigationBar;