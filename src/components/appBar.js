import {
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Tab,
    Tabs,
    makeStyles
  } from '@material-ui/core';
  import React, { useState, useEffect } from 'react';
  import firebase from '../config/firebase';
  import {
    setCurrentUser,
    getCurrentUser
  } from '../services/userService'
  import history from '../route/history';

export const AppNavBar = ()=>{
    const styles = useStyles();
    const currentUser = getCurrentUser();
    const logout = async () => {
        await firebase.auth().signOut();
        console.log('User successfully logout');
        setCurrentUser(null);
        history.push('/login');
      };
    return(
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={styles.title}>
            Login as : {currentUser.email}
          </Typography>
          <Tabs>
            <Tab label="Exchange" onClick={()=>{history.push('/');}}/>
            {/* <Tab label="Eth to EOS" onClick={()=>{history.push('/eth-eos');}}/> */}
            <Tab label="Corda Demo" onClick={()=>{history.push('/corda');}}/>
        </Tabs>
          <Button color="inherit" onClick={logout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      width: 500,
      paddingBottom: 100,
    },
    textBox: {
      width: 400,
      height: 20,
      marginBottom: 20,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));