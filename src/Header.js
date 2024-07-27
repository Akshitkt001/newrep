import React, { useState } from 'react';
import "./css/header.css";
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material';

function Header({ photoURL, searchTerm, setSearchTerm }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [theme, setTheme] = useState('light'); // Default theme

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuClick = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleHelpClick = () => {
    alert('Drive Clone made by Akshit Kumar Tiwari.');
  };

  const handleSettingsClick = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleProfileClick = () => {
    window.open('https://myaccount.google.com/', '_blank'); // Navigate to Google Account
  };

  const handleSignOut = () => {
    // Sign out logic
    window.location.href = '/'; // Redirect to the main sign-in screen
  };

  return (
    <div className={`header ${theme}`}>
      <div className='header__logo'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png' alt='Drive Logo' />
        <span>Drive Clone</span>
      </div>
      <div className='header__search'>
        <SearchIcon />
        <input
          type="text"
          placeholder='Search in Drive'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormatAlignCenterIcon />
      </div>
      <div className='header__icons'>
        <Tooltip title="Help">
          <IconButton onClick={handleHelpClick}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Apps">
          <IconButton onClick={handleMenuClick}>
            <AppsIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => window.open('https://github.com', '_blank')}>
            <GitHubIcon style={{ marginRight: '8px' }} />
            GitHub
          </MenuItem>
          <MenuItem onClick={() => window.open('https://linkedin.com', '_blank')}>
            <LinkedInIcon style={{ marginRight: '8px' }} />
            LinkedIn
          </MenuItem>
        </Menu>
        <Tooltip title="Profile">
          <IconButton
            onClick={handleProfileMenuClick}
            aria-controls="profile-menu"
            aria-haspopup="true"
          >
            <AccountCircleIcon src={photoURL} />
          </IconButton>
        </Tooltip>
        <Menu
          id="profile-menu"
          anchorEl={profileMenuAnchorEl}
          open={Boolean(profileMenuAnchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>
            <AccountCircleIcon style={{ marginRight: '8px' }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
