import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import firebase from '../config/firebase';
import history from '../route/history'
import { saveUser, setCurrentUser } from '../services/userService';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const signUp = async (email,ethKey,eosKey, password, setMessage) => {
  setMessage(null);
  console.log(email,password)
  if (email && password) {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(user.user.uid);
      await firebase.auth().updateCurrentUser(user.user)
      await saveUser(user.user.uid,{uid:user.user.uid,email:user.user.email,ethKey,eosKey})

      setCurrentUser(user.user)
      setMessage(null);
      history.push('/');
     
      
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  }
};

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState(null);
  const [eosKey, setEosKey] = useState(null);
  const [ethKey, setEthKey] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ethKey"
            label="Ethereum wallet address"
            name="ethKey"
            autoComplete="ethKeys"
            autoFocus
            onChange={(event) => setEthKey(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="eosKey"
            label="EOS wallet address"
            name="eosKey"
            autoComplete="eosKey"
            autoFocus
            onChange={(event) => setEosKey(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {message ? (
            <FormLabel style={{ color: 'red' }}>{message}</FormLabel>
          ) : null}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => signUp(email,ethKey,eosKey, password, setMessage)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
