import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({onLogout}) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          Hello Vanhh!
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <button color="inherit" onClick={onLogout} float="left">
          Logout
        </button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
