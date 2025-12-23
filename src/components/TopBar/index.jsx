import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({onLogout}) {
  let user = JSON.parse(localStorage.getItem('user'));
  let firstName = user ? user.first_name : '';
  let lastName = user ? user.last_name : '';
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          Hello {firstName} {lastName}!
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={onLogout} float="left">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
