import {
  Button,
  makeStyles,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  FormGroup,
  Grid
} from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { tokenList } from '../const';
import { ethTransferAndCall,getEthEthTokenBalance } from '../services/ethServices';
import firebase from '../config/firebase';
import {
  getCurrentUser,
  getUserById,
} from '../services/userService';
import history from '../route/history';
import { formatNumber } from '../services/sharedService';
import { getExchangeIds } from '../services/getExchangeIds';
import {ClaimListView} from '../components/claimListView'
import {AppNavBar} from '../components/appBar'

function Main() {
  const styles = useStyles();
  const [receiverId, setReceiverId] = useState(undefined);
  const [expectedToken, setExpectedToken] = useState('');
  const [sendingToken, setSendingToken] = useState('');
  const [sendingAmount, setSendingAmount] = useState(undefined);
  const [expectedAmount, setExpectedAmount] = useState(undefined);
  const [privateKey, setPrivateKey] = useState(undefined);
  const [claims, setClaim] = useState([]);
  const [network, setNetwork] = useState(undefined);
  const [ethRopTokenBalance, setEthRopTokenBalance] = useState(0);
  const [ethRinTokenBalance, setEthRinTokenBalance] = useState(0);
  const [resultLink, setResultLink] = useState(undefined);

  const updateBalance = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const ropBalance = await getEthEthTokenBalance(currentUser.ethKey,'ropsten');
    setEthRopTokenBalance(ropBalance);
    const rinBalance = await getEthEthTokenBalance(currentUser.ethKey,'rinkeby');
    setEthRinTokenBalance(rinBalance);
  };
  
  const transfer = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    console.log('Curent user', currentUser);
    const receiver = await getUserById(receiverId);
    const link =await ethTransferAndCall(
      currentUser.ethKey,
      privateKey,
      formatNumber(sendingAmount),
      formatNumber(expectedAmount),
      receiver.ethKey,
      expectedToken,
      sendingToken
    );
    setResultLink(link)
  };
  const check = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    console.log('current user',currentUser)
    const claimRes = await getExchangeIds(network, currentUser.ethKey);
    console.log('-------------', claimRes);
    setClaim(claimRes);
  };

  updateBalance();

  return (
    <div>
    <AppNavBar/>
    <Grid container spacing={3}>
        <Grid item xs={8}>
      <Paper className={styles.paper} style={{ alignContent: 'flex-end' }}>
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
          <InputLabel id="demo-simple-select-outlined-label">
            Sending Token
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={sendingToken}
            onChange={(event) => {
              setSendingToken(event.target.value);
            }}
            label="Sending Token"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {tokenList.map((token) => {
              return <MenuItem value={token.address}>{token.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={styles.textBox}
          size="small"
          margin="normal"
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Receiving Token
          </InputLabel>
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
            {tokenList.map((token) => {
              return <MenuItem value={token.address}>{token.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
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
        {
              resultLink?(
                <Button
              variant="contained"
              style={{ marginTop: 30, marginLeft: 30,background:'green',color:'white' }}
              onClick={()=>{window.open(resultLink, "_blank");}}
            >
              View Result
            </Button>
              ):null
            }
      </Paper>
      </Grid>
      <Grid item xs={4} style={{marginTop: 20}}>
            <Container fluid>
              <Row
                style={{
                  height: 60,
                  alignContent: 'center',
                  textAlign: 'center',
                  borderWidth: '2px',
                    borderColor: '#aaaaaa',
                    borderStyle: 'solid'
                }}
              >
                <Col
                  style={{
                    borderWidth: '0 2px 0 0',
                    borderColor: '#aaaaaa',
                    borderStyle: 'solid',
                  }}
                >
                
                  ROP Token <br /> {ethRopTokenBalance}{' '}
                </Col>
                <Col style={{}}>
                  RIN Token
                  <br /> {ethRinTokenBalance}
                </Col>
              </Row>
            </Container>
        </Grid>
      </Grid>
      <Paper>
        <FormControl
          variant="outlined"
          className={styles.textBox}
          size="small"
          margin="normal"
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Networks
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={network}
            onChange={(event) => {
              setNetwork(event.target.value);
            }}
            label="Expected Token"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {tokenList.map((token) => {
              return <MenuItem value={token.escrow}>{token.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 19, marginLeft: 60 }}
          onClick={check}
        >
          Check
        </Button>
        <FormGroup row>
          <List dense={true}>
            {claims
              ? claims.map((claim) => {
                  return (
                    <ClaimListView claim={claim} network={network}/>
                  );
                })
              : null}
          </List>
        </FormGroup>
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

export default Main;
