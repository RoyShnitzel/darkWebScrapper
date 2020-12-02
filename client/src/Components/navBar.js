import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from "@material-ui/icons/Language";
import KeyWordModal from "./KeyWordModal";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AnnouncementIcon from "@material-ui/icons/Announcement";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
    "&:focus": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "none",
    },
    "&:visited": {
      textDecoration: "none",
    },
    "&:link": {
      textDecoration: "none",
    },
    "&:active": {
      textDecoration: "none",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar({ notificationsData, setNotifications }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [keyWordsData, setKeyWordsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    if (notificationsData.length > 0) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleReadAll = () => {
    setAnchorEl(null);
    setNotifications([]);
  };

  const handleClose = (index) => {
    setAnchorEl(null);
    const newNotifications = [...notificationsData];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fetchKeyWordsData = async () => {
    const { data: keyWords } = await axios.get("/api/keyword");
    setKeyWordsData(keyWords);
  };
  console.log(notificationsData);
  useEffect(() => {
    fetchKeyWordsData();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Link className={classes.link} to="/">
              <LanguageIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              Dark Web Scrapper
            </Link>
          </Typography>
          <IconButton onClick={handleMenu} color="inherit">
            <Badge badgeContent={notificationsData.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {notificationsData.length > 0 ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{ paddingLeft: 5 }}
                >
                  Notifications
                </Typography>
                <Button onClick={() => handleReadAll()}>
                  Mark All As Read
                </Button>
              </div>
            ) : null}
            {notificationsData.length > 0
              ? notificationsData.map((element, index) => {
                  if (element.name === "notifications-alerts") {
                    return (
                      <MenuItem
                        key={element.name + index}
                        onClick={() => handleClose(index)}
                      >
                        <Link className={classes.link} to="/alerts">
                          <div
                            style={{
                              color: "blue",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <AnnouncementIcon />
                            {element.message}
                          </div>
                        </Link>
                      </MenuItem>
                    );
                  } else if (element.name === "scrapperFailed") {
                    return (
                      <MenuItem
                        key={element.name + index}
                        onClick={() => handleClose(index)}
                      >
                        <div
                          style={{
                            color: "red",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <ErrorIcon />
                          {element.message}
                        </div>
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem
                        key={element.name + index}
                        onClick={() => handleClose(index)}
                      >
                        <div
                          style={{
                            color: "green",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircleIcon />
                          {element.message}
                        </div>
                      </MenuItem>
                    );
                  }
                })
              : null}
          </Menu>
          <Link className={classes.link} to="/alerts">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <ErrorIcon /> Alerts
              <ErrorIcon />
            </IconButton>
          </Link>
          <Button onClick={() => setOpen(true)}>KeyWords</Button>
          <KeyWordModal
            open={open}
            setOpen={setOpen}
            keyWordsData={keyWordsData}
            fetchKeyWordsData={fetchKeyWordsData}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
