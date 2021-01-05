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
  Grid,
  Card,
} from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import {
  ethToEosTransferAndCall,
  getEthTokenBalance,
} from '../services/ethServices';
import { transferEos, getEosTokenBalance } from '../services/eosService';
import { getCurrentUser, getUserById } from '../services/userService';
import { formatNumber } from '../services/sharedService';
import { getEthExchanges } from '../services/getExchangeIds';
import { EosEthClaimListView } from '../components/eosEthClaimList';
import { AppNavBar } from '../components/appBar';
import { findByPubKey } from '../services/eosExchangeTable';

function EosMain() {
  const styles = useStyles();
  const [receiverId, setReceiverId] = useState(undefined);
  const [expectedToken, setExpectedToken] = useState('none');
  const [sendingToken, setSendingToken] = useState('none');
  const [sendingAmount, setSendingAmount] = useState(undefined);
  const [expectedAmount, setExpectedAmount] = useState(undefined);
  const [privateKey, setPrivateKey] = useState(undefined);
  const [claims, setClaim] = useState([]);
  const [network, setNetwork] = useState('none');
  const [resultLink, setResultLink] = useState(undefined);

  const [eosTokenBalance, setEosTokenBalance] = useState('0 FYP');
  const [ethTokenBalance, setEthTokenBalance] = useState(0);

  const transfer = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const receiver = await getUserById(receiverId);

    if (sendingToken === 'ETH') {
      const result =await ethToEosTransferAndCall(
        currentUser.ethKey,
        receiver.ethKey,
        privateKey,
        formatNumber(sendingAmount),
        expectedAmount,
        currentUser.eosKey,
        receiver.eosKey
      );
      
      setResultLink(`https://rinkeby.etherscan.io/tx/${result}`)
    }
    if (sendingToken === 'EOS') {
      const result =await transferEos(
        currentUser.eosKey,
        receiver.eosKey,
        receiver.ethKey,
        currentUser.ethKey,
        sendingAmount,
        formatNumber(expectedAmount),
        privateKey
      );
      setResultLink(`https://kylin.bloks.io/transaction/${result}`)
    }
  };
  const updateBalance = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const ethBalance = await getEthTokenBalance(currentUser.ethKey);
    setEthTokenBalance(ethBalance);
    const eosBalance = await getEosTokenBalance(currentUser.eosKey);
    setEosTokenBalance(eosBalance);
  };
  const check = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    if (network === 'ETH') {
      const claimRes = await getEthExchanges(currentUser.ethKey);
      setClaim(claimRes);
    }
    if (network === 'EOS') {
      const claimRes = await findByPubKey(currentUser.eosKey);
      setClaim(claimRes);
    }
  };

  updateBalance();
  return (
    <div>
      <AppNavBar />
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
              onChange={(event) => setReceiverId(event.target.value.trim())}
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
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="ETH">RIN - ETH</MenuItem>
                <MenuItem value="EOS">FYP - EOS</MenuItem>
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
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="ETH">RIN - ETH</MenuItem>
                <MenuItem value="EOS">FYP - EOS</MenuItem>
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
              onChange={(event) => setSendingAmount(event.target.value.trim())}
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
              onChange={(event) => setExpectedAmount(event.target.value.trim())}
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
              onChange={(event) => setPrivateKey(event.target.value.trim())}
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
                  EOS Token Balance <br /> {eosTokenBalance}{' '}
                </Col>
                <Col style={{}}>
                  Eth Token Balance
                  <br /> {ethTokenBalance}
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
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            <MenuItem value="ETH">Ethereum</MenuItem>
            <MenuItem value="EOS">EOS</MenuItem>
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
                    <EosEthClaimListView
                      claim={claim}
                      network={network}
                      key={claim.exchangeId}
                    />
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

export default EosMain;
