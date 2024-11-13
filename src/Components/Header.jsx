import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { GrMenu } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const drawerWidth = 240;

  const navItems = [
    {
      label: "Movies",
      link: "/",
    },
  ];

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        LOGO
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              ".link_tag": { textDecoration: "none", width: "100%" },
              ".active": {
                background: "#1976d2",
              },
              ".active .menu_text": {
                color: "white",
              },
            }}
          >
            <NavLink
              to={item?.link}
              className="link_tag"
              activeClassName="active"
            >
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText
                  primary={item?.label}
                  sx={{ color: "black" }}
                  className="menu_text"
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Container
            sx={{ minHeight: "64px", display: "flex", alignItems: "center" }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, path: { stroke: "white" } }}
            >
              <GrMenu color="white" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                a: { textDecoration: "none", color: "white" },
              }}
            >
              <Link to={`/`}>LOGO</Link>
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                ".active": {
                  borderBottom: "1px solid white",
                },
                gap: 1,
              }}
            >
              {navItems.map((item, index) => (
                <NavLink to={item?.link} key={index} activeClassName="active">
                  <Button
                    sx={{
                      color: "#fff",
                      padding: 0,
                      borderRadius: 0,
                    }}
                  >
                    {item?.label}
                  </Button>
                </NavLink>
              ))}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;
