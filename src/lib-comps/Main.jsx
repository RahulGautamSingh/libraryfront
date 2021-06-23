import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  CssBaseline,
  Container,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import BookIcon from "@material-ui/icons/Book";
import CategoryIcon from "@material-ui/icons/Category";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import GroupIcon from "@material-ui/icons/Group";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import BookList from "./Books";
import SignUp from "./SignUp";
import Login from "./Login";
import setupInterceptors from "../networkUtils/interceptors";

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
}));

export default function Main() {
  let history=useHistory()
  setupInterceptors(history)
  return (
    <>
      <Wrapper>
        <Switch>
          <Route exact path="/">
            Welcome to Library
          </Route>
          <Route exact path="/books">
            <BookList />
          </Route>
          <Route exact path="/categories">
            List of categories
          </Route>
          <Route exact path="/issues">
            List of issued books
          </Route>
          <Route exact path="/members">
            List of members
          </Route>
          <Route exact path="/signup">
           <SignUp />
          </Route>
          <Route exact path="/login">
           <Login />
          </Route>
        </Switch>
      </Wrapper>
    </>
  );
}
function Wrapper(props) {
  const classes = useStyles();
  let [drawerOpen, setDrawerOpen] = useState(false);
  let icons = [
    <LibraryBooksIcon />,
    <CategoryIcon />,
    <BookIcon />,
    <GroupIcon />,
  ];
  let link = ["/books", "/categories", "/issues", "/members"];
  let toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Mclaren College Library
          </Typography>
          {/* {
           localStorage.getItem("user")!==null &&
           
                  <div>
                  <p style={{color:"white"}}>{"Hello, "+JSON.parse(localStorage.getItem("user")).name}</p>
                  <img src={"C:/Users/LENOVO/Desktop/Nodejs/library/"+JSON.parse(localStorage.getItem("user")).avatar} alt="" style={{width:"50px",height:"50px"}}/>
                  </div>
          } */}
          <Link to={"/login"} >
          <Button color="white">Login</Button>
          <Button onClick={()=>
            localStorage.clear()}>Log out</Button>
          </Link>

         
        </Toolbar>
      </AppBar>
      {/* {props.children} */}
      <React.Fragment>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <Typography variant="h5" className={classes.title} align="center">
              Menu
            </Typography>
            <hr />
            {["Books", "Categories", "Books issued", "Members"].map(
              (text, index) => {
                return (
                  <Link to={link[index]} onClick={toggleDrawer}>
                    <ListItem className={classes.list} button key={text}>
                      <ListItemIcon>{icons[index]}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                );
              }
            )}
          </List>
        </Drawer>
      </React.Fragment>
      <Container>{props.children}</Container>
    </div>
  );
}
