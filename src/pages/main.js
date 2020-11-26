import {
  Button,
  makeStyles,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { readHash } from "../const";
import { ethTransferAndCall } from "../services/ethServices";
import firebase from '../config/firebase';
import { setCurrentUser,getCurrentUser, getUserById } from "../services/userService";
import history from '../route/history'

function Main() {
  const styles = useStyles();
  const [receiverId, setReceiverId] = useState(undefined);
  const [expectedToken, setExpectedToken] = useState("");
  const [sendingAmount, setSendingAmount] = useState(undefined);
  const [expectedAmount, setExpectedAmount] = useState(undefined);
  const [privateKey, setPrivateKey] = useState(undefined);
  const currentUser = getCurrentUser()
  const logout = async ()=>{
    await firebase
        .auth()
        .signOut()
        console.log('User successfully logout')
        setCurrentUser(null)
        history.push('/login');
  }
  const transfer = async () => {
    console.log("Done---", {
      receiverId,
      expectedToken,
      sendingAmount,
      expectedAmount,
    });
    const currentUserUid = getCurrentUser().uid
    const currentUser =await getUserById(currentUserUid)
    console.log('Curent user',currentUser)
    const receiver = await getUserById(receiverId)
   await ethTransferAndCall(currentUser.ethKey,privateKey,sendingAmount,expectedAmount,receiver.ethKey,readHash);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
           
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            Login as : {currentUser.uid}
          </Typography>
          <Button color="inherit" onClick={logout}>logout</Button>
        </Toolbar>
      </AppBar>

      <Paper className={styles.paper} style={{ alignContent: "flex-end" }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="receiver"
          label="Receiver id"
          name="receiver"
          autoComplete="receiver"
          autoFocus
          className={styles.textBox}
          size="small"
          onChange={(event) => setReceiverId(event.target.value)}
        />
        <FormControl
          variant="outlined"
          className={styles.textBox}
          size="small"
          margin="normal"
        >
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={expectedToken}
            onChange={(event) => {
              setExpectedToken(event.target.value);
            }}
            label="Expected Token"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'ETHEREUM'}>ETHEREUM</MenuItem>
            <MenuItem value={'EOS'}>EOS</MenuItem>
          </Select>
        </FormControl>
        {/* <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="expectedToken"
          label="Expected Token"
          name="expectedToken"
          autoComplete="expectedToken"
          autoFocus
          className={styles.textBox}
          size="small"
          onChange={(event) => setExpectedToken(event.target.value)}
        /> */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="sendingAmount"
          label="Sending amount"
          name="sendingAmount"
          autoComplete="sendingAmount"
          autoFocus
          className={styles.textBox}
          size="small"
          onChange={(event) => setSendingAmount(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="expectedAmount"
          label="Expected amount"
          name="expectedAmount"
          autoComplete="expectedAmount"
          autoFocus
          className={styles.textBox}
          size="small"
          onChange={(event) => setExpectedAmount(event.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="privateKey"
          label="Wallet private key"
          name="privateKey"
          autoComplete="privateKey"
          autoFocus
          className={styles.textBox}
          size="small"
          onChange={(event) => setPrivateKey(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 30 }}
          onClick={transfer}
        >
          Transfer
        </Button>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
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

export default Main;
