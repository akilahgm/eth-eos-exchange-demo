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
import React, { useState } from 'react';
import { tokenList, networkList,eosExchangeEthEscrow } from '../const';
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
  const [ethTokenBalance, setEthTokenBalance] = useState([]);
  const [eosTokenBalance, setEosTokenBalance] = useState('0 FYP');
  const [resultLink, setResultLink] = useState(undefined);

  const updateBalance = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const ethBalances = await getEthEthTokenBalance(currentUser.ethKey);
    setEthTokenBalance(ethBalances);
    const eosBalance = await getEosTokenBalance(currentUser.eosKey);
    setEosTokenBalance(eosBalance);
  };

  const transfer = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const receiver = await getUserById(receiverId);
    console.log('Token transferring',{expectedToken,sendingToken})
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
        setResultLink(`https://kylin.bloks.io/transaction/${result}`);
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
        setResultLink(`https://${eosExchangeEthEscrow.network}.etherscan.io/tx/${result}`);
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
  };
  const check = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    if (network === 'ETH') {
      const claimRes = await getEthExchanges(currentUser.ethKey);
      setClaim(claimRes);
    }
    else if (network === 'EOS') {
      const claimRes = await findByPubKey(currentUser.eosKey);
      setClaim(claimRes);
    }else{
      const claimRes = await getExchangeIds(network, currentUser.ethKey);
    setClaim(claimRes);
    }
    
    updateBalance();
  };

  // updateBalance();

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
                borderWidth: '2px',
                borderColor: '#aaaaaa',
                borderStyle: 'solid',
              }}
            >
              <Col>
                EOS Token <br /> {eosTokenBalance}{' '}
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
                    borderWidth: '2px',
                    borderColor: '#aaaaaa',
                    borderStyle: 'solid',
                    marginTop: 5,
                  }}
                >
                  <Col>
                    {token.name} <br /> {token.balance}{' '}
                  </Col>
                </Row>
              );
            })}
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
            {networkList.map((network) => {
              return (
                <MenuItem value={network.address}>{network.name}</MenuItem>
              );
            })}
            <MenuItem value={'EOS'}>{'EOS KYLIN'}</MenuItem>
            <MenuItem value={'ETH'}>{'ETH-EOS RIN network'}</MenuItem>
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
                  return <ClaimListView claim={claim} network={network} />;
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
