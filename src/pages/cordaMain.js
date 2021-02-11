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
  getEthBalance,
} from '../services/ethServices';
import { transferEos, getEosTokenBalance } from '../services/eosService';
import {
  getCurrentUser,
  getUserById,
  createAccount,
  getAccount,
  getAccountBalance,
} from '../services/userService';
import { formatNumber } from '../services/sharedService';
import { getEthExchanges } from '../services/getExchangeIds';
import { CordaExchangeList } from '../components/cordaExchangeList';
import { AppNavBar } from '../components/appBar';
import { findByPubKey } from '../services/eosExchangeTable';
import { getExchanges, buyShares } from '../services/cordaService';

function CordaMain() {
  const styles = useStyles();
  const [createAccountName, setCreateAccountName] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [userAccount, setUserAccount] = useState(undefined);
  const [expectedToken, setExpectedToken] = useState('none');
  const [expectedShares, setExpectedShares] = useState('none');
  const [sendingEthAmount, setSendingEthAmount] = useState(undefined);
  const [privateKey, setPrivateKey] = useState(undefined);
  const [claims, setClaim] = useState([]);
  const [resultLink, setResultLink] = useState(undefined);

  const [selectedCordaAccount, setSelectedCordaAccount] = useState(0);
  const [cordaTokenBalance, setCordaTokenBalance] = useState(0);
  const [ethTokenBalance, setEthTokenBalance] = useState(0);

  const createNewAccount = async () => {
    const currentUserUid = getCurrentUser().uid;
    await createAccount(currentUserUid, createAccountName);
  };
  const exchange = async () => {
    setResultLink(undefined);
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const id = await buyShares(
      currentUser.ethKey,
      privateKey,
      sendingEthAmount,
      userAccount,
      expectedShares
    );
    setResultLink('https://rinkeby.etherscan.io/tx/' + id);
  };

  const updateBalance = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const accountArray = [];

    for (const iterator of Object.keys(currentUser.account)) {
      console.log(currentUser.account[iterator]);
      accountArray.push({ name: currentUser.account[iterator], key: iterator });
    }
    setAccounts(accountArray);
    const ethBalance = await getEthBalance(currentUser.ethKey);
    setEthTokenBalance(ethBalance);

    const cordaBalance = await getAccountBalance(selectedCordaAccount);
    setCordaTokenBalance(cordaBalance);
  };
  const check = async () => {
    updateBalance();
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);

    const claimRes = await getExchanges(currentUser.ethKey);
    setClaim(claimRes);
  };

  // updateBalance();
  return (
    <div style={{ background: '#f7f7f7' }}>
      <AppNavBar />
      <Grid container spacing={3}>
        <Grid item xs={9} style={{ marginLeft: 30, marginTop: 15 }}>
          <Paper
            style={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: 500,
              paddingTop: 3,
              paddingBottom:18
            }}
            elevation={3}
          >
            <Container fluid>
              <Row style={{ margin: 10, marginTop: 20 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Create Account
                </InputLabel>
              </Row>
              <Row style={{ margin: 0 }}>
                <Col>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="account"
                    label="Account name"
                    name="account"
                    autoComplete="account"
                    autoFocus
                    size="small"
                    onChange={(event) =>
                      setCreateAccountName(event.target.value.trim())
                    }
                  />
                </Col>
                <Col style={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ alignContent: 'center', justifyContent: 'center' }}
                    onClick={createNewAccount}
                  >
                    Create
                  </Button>
                </Col>
              </Row>
            </Container>
          </Paper>
        </Grid>

        <Grid item xs={8} style={{ marginLeft: 30 }}>
          <Paper
            className={styles.paper}
            style={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            elevation={3}
          >
            <FormControl
              variant="outlined"
              className={styles.textBox}
              size="small"
              margin="normal"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Select Account
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={userAccount}
                onChange={(event) => {
                  setUserAccount(event.target.value);
                }}
                label="Sending Token"
              >
                {accounts
                  ? accounts.map((account) => {
                      return (
                        <MenuItem value={account.name} key={account.key}>
                          {account.name}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              className={styles.textBox}
              size="small"
              margin="normal"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Token to Purchase
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
                <MenuItem value="FYP">FYP</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="expectingShares"
              label="Number of tokens"
              name="expectingShares"
              autoComplete="expectingShares"
              autoFocus
              className={styles.textBox}
              size="small"
              onChange={(event) => {
                setExpectedShares(event.target.value.trim());
                const ethVal =
                  Math.round(
                    (Number(event.target.value.trim()) * 0.01 +
                      Number.EPSILON) *
                      100
                  ) / 100;
                setSendingEthAmount(ethVal);
              }}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              disabled
              defaultValue={0}
              id="expectedAmount"
              title={'Expected Ethereum Balance'}
              name="expectedAmount"
              label="Ethereum amount"
              value={sendingEthAmount ? sendingEthAmount + ' ETH' : 0}
              className={styles.textBox}
              size="small"
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
              onClick={exchange}
            >
              Buy Shares
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
                View Transaction
              </Button>
            ) : null}
          </Paper>
        </Grid>
        <Grid item xs={3} style={{ marginTop: 10 }}>
          <Container fluid>
            <Row
              style={{
                height: 60,
                alignContent: 'center',
                textAlign: 'center',
                borderWidth: '2px',
                borderColor: '#aaaaaa',
                borderStyle: 'solid',
              }}
            >
              <Col style={{}}>
                Eth Balance
                <br /> {ethTokenBalance}
              </Col>
            </Row>
            <Row
              style={{
                height: 60,
                alignContent: 'center',
                textAlign: 'center',
                borderWidth: '2px',
                borderColor: '#aaaaaa',
                borderStyle: 'solid',
              }}
            >
              <Col>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedCordaAccount}
                  onChange={(event) => {
                    setSelectedCordaAccount(event.target.value);
                  }}
                  label="Sending Token"
                >
                  {accounts
                    ? accounts.map((account) => {
                        return (
                          <MenuItem value={account.name} key={account.key}>
                            {account.name}
                          </MenuItem>
                        );
                      })
                    : null}
                </Select>
                Account Balance
                <br /> {cordaTokenBalance}
              </Col>
            </Row>
          </Container>
        </Grid>
      </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 19, marginLeft: 60 }}
          onClick={check}
        >
          Refresh
        </Button>
        <FormGroup style={{ background: '#f7f7f7' }} row>
          <List dense={true}>
            {claims
              ? claims.map((claim) => {
                  return (
                    <CordaExchangeList claim={claim} key={claim.exchangeId} />
                  );
                })
              : null}
          </List>
        </FormGroup>
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
    marginBottom:20
  },
  textBox: {
    width: 400,
    height: 20,
    marginBottom: 20,
    alignContent: 'center',
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

export default CordaMain;
