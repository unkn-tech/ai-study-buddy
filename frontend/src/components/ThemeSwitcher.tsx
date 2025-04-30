import { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ThemeSwitcherProps {
  onThemeChange: (isDark: boolean) => void;
  isDarkMode: boolean;
}

const ThemeSwitcher = ({ onThemeChange, isDarkMode }: ThemeSwitcherProps) => {
  return (
    <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <IconButton 
        onClick={() => onThemeChange(!isDarkMode)} 
        color="inherit"
        sx={{ ml: 1 }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSwitcher; 