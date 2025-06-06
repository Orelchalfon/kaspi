import React from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const MuiNavigation = () => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "rgba(255,255,255,0.9)", color: "black" }}
    >
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Menu sx={{ width: 35, height: 35 }} />
        </IconButton>
        <h1 style={{ flexGrow: 1 }}>PlaceShare</h1>
        <nav>
          <ul>
            <li>
              <h3>
                <Link className="link" href="/">
                  All Users
                </Link>
              </h3>
            </li>
            <li>
              <h3>
                <Link className="link" href="/1/places">
                  My Places
                </Link>
              </h3>
            </li>
            <li>
              <h3>
                <Link className="link" href="/places/new">
                  Add Place
                </Link>
              </h3>
            </li>

            <li>
              <h3>
                <Link className="link" href="/auth">
                  Authenticate
                </Link>
              </h3>
            </li>
          </ul>
        </nav>
      </Toolbar>{" "}
    </AppBar>
  );
};

export default MuiNavigation;
