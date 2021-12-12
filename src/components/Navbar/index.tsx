import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Container>
          <Typography variant="h6" color="inherit" component="div">
            POST
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
