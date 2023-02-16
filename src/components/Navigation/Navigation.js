//React
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
//Mui
import {
  MenuItem,
  Box,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  MenuList,
  SpeedDial,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
//Provider
import { UserContext } from "../User/User";
//Components
import Post from "../Post/Post";

const menuList = [
  { title: "log-in", icon: LoginRoundedIcon, link: "/login" },
  { title: "sign-up", icon: CloseRoundedIcon, link: "/signup" },
];
const menuListUser = [
  {
    title: "home",
    link: "/",
    icon: HomeRoundedIcon,
  },
  {
    title: "users",
    link: "/users",
    icon: GroupRoundedIcon,
  },
  {
    title: "settings",
    link: "/settings",
    icon: SettingsRoundedIcon,
  },
];

export default function Navigation() {
  const [value, setValue] = useState(0);
  const { currentUser } = useContext(UserContext);
  const [post, setPost] = useState(false);


  const handleClickOpen = () => {
    if (post) {
      setPost(false);
    } else {
      setPost(true);
    }
  };

  return (
    <>
      {/* Desktop Nav */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "fixed",
          top: "0",
          flexFlow: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          height: "100vh",
          bgcolor: "primary.main",
        }}
      >
        <MenuList>
          {(currentUser ? menuListUser : menuList).map((item, index) => (
            <MenuItem
              key={index}
              component={Link}
              to={item.link}
              sx={{ display: "flex", flexFlow: "column", color: "#fff", py: 2 }}
            >
              <item.icon />
              <ListItemText
                primary={item.title}
                sx={{ textTransform: "capitalize" }}
              />
            </MenuItem>
          ))}
          {currentUser && (
            <MenuItem
              sx={{ display: "flex", flexFlow: "column", color: "#fff", py: 2 }}
              onClick={handleClickOpen}
            >
              <CreateRoundedIcon />
              <ListItemText
                primary="Post"
                sx={{ textTransform: "capitalize" }}
              />
            </MenuItem>
          )}
        </MenuList>
      </Box>
      {/* Mobile Nav */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 3,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            height: "70px",
            boxShadow: 5,
          }}
        >
          {(currentUser ? menuListUser : menuList).map((item, index) => (
            <BottomNavigationAction
              key={index}
              sx={{ textTransform: "capitalize" }}
              component={Link}
              to={item.link}
              label={item.title}
              icon={<item.icon />}
            />
          ))}
        </BottomNavigation>
        <SpeedDial
          sx={{ position: "fixed", bottom: "100px", right: "30px" }}
          ariaLabel="dial"
          icon={<CreateRoundedIcon />}
          onClick={handleClickOpen}
        ></SpeedDial>
      </Box>
      {/* Post Modal */}
      {post && <Post click={setPost} />}
    </>
  );
}
