import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from 'react-router-dom';


const pages = ['Account', 'Display', 'Security', 'Notifications'];
const settingsPages = ["/SettingsPage/AccountSettings", "/SettingsPage/Display",
                         "/SettingsPage/AccountSecurity",
                        "/SettingsPage/Notifications"
                        ];

function SettingsNavigationBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className='pt-8'>
        <AppBar position="static" elevation={0}>
          <Container maxWidth="xl" className='flex justify-center' sx={{ background: 'linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%)' }}>
            <Toolbar disableGutters>
              <SettingsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#94a3b8' }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: '#f1f5f9',
                  textDecoration: 'none',
                  fontSize: '1.35rem'
                }}
              >
                Settings
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
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiPaper-root': {
                      backgroundColor: '#334155',
                      color: '#f1f5f9'
                    }
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem
                      key={page}
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to={settingsPages[index]}
                      sx={{
                        backgroundColor: isActive(settingsPages[index]) ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(148, 163, 184, 0.1)'
                        }
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <SettingsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#94a3b8' }} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: '#f1f5f9',
                  textDecoration: 'none',
                  justifyContent: 'center'
                }}
              >
                Settings
              </Typography>
              <Box sx={{display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {pages.map((page, index) => (
                  <Button
                    component={Link}
                    to={settingsPages[index]}
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: isActive(settingsPages[index]) ? '#60a5fa' : '#e2e8f0',
                      display: 'block',
                      backgroundColor: isActive(settingsPages[index]) ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      borderRadius: '8px',
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        color: '#f1f5f9'
                      }
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
    </div>
  );
}
export default SettingsNavigationBar;