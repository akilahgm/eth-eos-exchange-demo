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
} from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import {
  tokenList,
  networkList,
  eosExchangeEthEscrow,
  eosEndpoint,
} from '../const';
import {
  ethTransferAndCall,
  ethToEosTransferAndCall,
  getEthEthTokenBalance,
} from '../services/ethServices';
import { getCurrentUser, getUserById } from '../services/userService';
import { transferEos, getEosTokenBalance } from '../services/eosService';
import { findByPubKey } from '../services/eosExchangeTable';
import { getEthExchanges } from '../services/getExchangeIds';
import { formatNumber } from '../services/sharedService';
import { getExchangeIds } from '../services/getExchangeIds';
import { ClaimListView } from '../components/claimListView';
import { AppNavBar } from '../components/appBar';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import MainTable from '../components/mainTable';

function Main() {
  const styles = useStyles();
  const [active, setActive] = useState(false);
  const [receiverId, setReceiverId] = useState(undefined);
  const [expectedToken, setExpectedToken] = useState('');
  const [sendingToken, setSendingToken] = useState('');
  const [sendingAmount, setSendingAmount] = useState(undefined);
  const [expectedAmount, setExpectedAmount] = useState(undefined);
  const [privateKey, setPrivateKey] = useState(undefined);
  const [claims, setClaim] = useState([]);
  const [network, setNetwork] = useState(undefined);
  const [ethTokenBalance, setEthTokenBalance] = useState([]);
  const [eosTokenBalance, setEosTokenBalance] = useState('0 FYP');
  const [resultLink, setResultLink] = useState(undefined);

  const updateBalance = async () => {
    try {
      const currentUserUid = getCurrentUser().uid;
      const currentUser = await getUserById(currentUserUid);
      const ethBalances = await getEthEthTokenBalance(currentUser.ethKey);
      setEthTokenBalance(ethBalances);
      const eosBalance = await getEosTokenBalance(currentUser.eosKey);
      setEosTokenBalance(eosBalance);
    } catch (err) {}
  };
  const capitalize = (str) => {
    return str && typeof str === 'string'
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : '';
  };
  const transfer = async () => {
    setActive(true);
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const receiver = await getUserById(receiverId);
    if (sendingToken == 'EOS' || expectedToken == 'EOS') {
      console.log('Exchange with eos');
      if (sendingToken === 'EOS') {
        const result = await transferEos(
          currentUser.eosKey,
          receiver.eosKey,
          receiver.ethKey,
          currentUser.ethKey,
          sendingAmount,
          formatNumber(expectedAmount),
          privateKey,
          expectedToken
        );
        setResultLink(`https://bloks.io/transaction/${result}`);
      } else {
        const result = await ethToEosTransferAndCall(
          currentUser.ethKey,
          receiver.ethKey,
          privateKey,
          formatNumber(sendingAmount),
          expectedAmount,
          currentUser.eosKey,
          receiver.eosKey,
          sendingToken
        );
        setResultLink(
          `https://${eosExchangeEthEscrow.network}.etherscan.io/tx/${result}`
        );
      }
    } else {
      const link = await ethTransferAndCall(
        currentUser.ethKey,
        privateKey,
        formatNumber(sendingAmount),
        formatNumber(expectedAmount),
        receiver.ethKey,
        expectedToken,
        sendingToken
      );
      setResultLink(link);
    }
    setActive(false);
  };
  const check = async () => {
    if (!network) {
      setActive(false);
      return;
    }
    setActive(true);
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    if (network === 'ETH') {
      const claimRes = await getEthExchanges(currentUser.ethKey);
      setClaim(claimRes);
    } else if (network === 'EOS') {
      const claimRes = await findByPubKey(currentUser.eosKey);
      setClaim(claimRes);
    } else {
      const claimRes = await getExchangeIds(network, currentUser.ethKey);
      setClaim(claimRes);
    }

    updateBalance();
    setActive(false);
  };
  useEffect(() => {
    updateBalance();
  }, []);
  useEffect(() => {
    check();
  }, [network]);
  return (
    <div style={{ background: '#f7f7f7' }}>
      <AppNavBar />
      <LoadingOverlay active={active} spinner={<BounceLoader />}>
        <Grid container spacing={3} style={{ marginLeft: 1 }}>
          <Grid item xs={8}>
            <Paper
              className={styles.paper}
              style={{
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              elevation={3}
            >
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
                  {tokenList.map((token) => {
                    return (
                      <MenuItem value={token.address}>{token.name}</MenuItem>
                    );
                  })}
                  <MenuItem value={'EOS'}>{'EOS-FYP'}</MenuItem>
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
                  {tokenList.map((token) => {
                    return (
                      <MenuItem value={token.address}>{token.name}</MenuItem>
                    );
                  })}
                  <MenuItem value={'EOS'}>{'EOS-FYP'}</MenuItem>
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
              {resultLink ? (
                <Button
                  variant="contained"
                  style={{
                    marginTop: 30,
                    marginLeft: 30,
                    background: 'green',
                    color: 'white',
                  }}
                  onClick={() => {
                    window.open(resultLink, '_blank');
                  }}
                >
                  View Result
                </Button>
              ) : null}
            </Paper>
          </Grid>
          <Grid item xs={4} style={{ marginTop: 20 }}>
            <Container fluid>
              <Row
                style={{
                  height: 60,
                  width: 250,
                  alignContent: 'center',
                  textAlign: 'center',
                }}
              >
                <Col>
                  <Paper
                    style={{
                      height: 60,
                      width: 250,
                    }}
                    elevation={1}
                  >
                    EOS Token <br />{' '}
                    <span style={{ fontWeight: 'bolder', fontStyle: 'italic' }}>
                      {eosTokenBalance}{' '}
                    </span>
                  </Paper>
                </Col>
              </Row>
              {ethTokenBalance.map((token) => {
                return (
                  <Row
                    style={{
                      height: 60,
                      width: 250,
                      alignContent: 'center',
                      textAlign: 'center',
                      marginTop: 10,
                    }}
                  >
                    <Col>
                      <Paper
                        style={{
                          height: 60,
                          width: 250,
                        }}
                        elevation={1}
                      >
                        {token.name} <br />{' '}
                        <span
                          style={{ fontWeight: 'bolder', fontStyle: 'italic' }}
                        >
                          {token.balance}{' '}
                        </span>
                      </Paper>
                    </Col>
                  </Row>
                );
              })}
            </Container>
          </Grid>
        </Grid>
        <Paper style={{ alignContent: 'center', alignItems: 'center' }}>
          <Container fluid>
            <Row
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                marginLeft: 600,
                marginBottom: 10,
                marginTop: 10,
                paddingTop: 10,
              }}
            >
              <Col>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={network}
                  onChange={(event) => {
                    setNetwork(event.target.value);
                  }}
                  label="Expected Token"
                  style={{ width: 400, height: 35 }}
                  variant="outlined"
                  size="small"
                >
                  {networkList.map((network) => {
                    return (
                      <MenuItem value={network.address}>
                        ETH-ETH {capitalize(network.name)}
                      </MenuItem>
                    );
                  })}
                  <MenuItem value={'EOS'}>{'ETH-EOS Mainnet'}</MenuItem>
                  <MenuItem value={'ETH'}>{'ETH-EOS Ropsten'}</MenuItem>
                </Select>
              </Col>
              <Col style={{ marginLeft: 200 }}>
                <Button variant="contained" color="primary" onClick={check}>
                  Check
                </Button>
              </Col>
            </Row>
          </Container>

          <FormGroup row>
            <MainTable claims={claims} network={network} />
          </FormGroup>
        </Paper>
      </LoadingOverlay>
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
    paddingBottom: 25,
    marginBottom: 20,
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
