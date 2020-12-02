import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    paddingBottom: "0.25%",
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
      <AppBar className={classes.navBar} position="fixed">
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
          <Typography variant="h5" className={classes.title}>
            <Link className={classes.link} to="/">
              <div style={{ fontFamily: "DM Sans", fontWeight: "bold" }}>
                Dark Web Scrapper
              </div>
            </Link>
          </Typography>
          <IconButton onClick={handleMenu} color="inherit">
            <Tooltip title="Notifications" aria-label="add">
              <Badge badgeContent={notificationsData.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </Tooltip>
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
                  <div style={{ fontSize: 10 }}>Mark All As Read</div>
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
                              color: "#457b9d",
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
                            color: "#9d0208",
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
                            color: "#90be6d",
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
              <Tooltip title="Alerts" aria-label="add">
                <ErrorIcon />
              </Tooltip>
            </IconButton>
          </Link>
          <Button onClick={() => setOpen(true)}>
            <span style={{ color: "white" }}>KeyWords</span>
          </Button>
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
