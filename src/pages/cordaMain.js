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
import React, { useState, useEffect } from 'react';
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
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import CordaTable from '../components/cordaTable';

function CordaMain() {
  const styles = useStyles();
  const [active, setActive] = useState(false);
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
    setActive(true);
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
    setActive(false);
  };

  const updateBalance = async () => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    const accountArray = [];

    if(currentUser.account&&currentUser.account.length>0){
      for (const iterator of Object.keys(currentUser.account)) {
        accountArray.push({ name: currentUser.account[iterator], key: iterator });
      }
    }
    setAccounts(accountArray);
    const ethBalance = await getEthBalance(currentUser.ethKey);
    setEthTokenBalance(ethBalance);

    const cordaBalance = await getAccountBalance(selectedCordaAccount);
    setCordaTokenBalance(cordaBalance);
  };
  const check = async () => {
    setActive(true);
    updateBalance();
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);

    const claimRes = await getExchanges(currentUser.ethKey);
    setClaim(claimRes);
    setActive(false);
  };

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    updateBalance();
  }, [selectedCordaAccount]);

  // updateBalance();
  return (
    <div style={{ background: '#f7f7f7' }}>
      <AppNavBar />
      <LoadingOverlay active={active} spinner={<BounceLoader />}>
        <Grid container spacing={3}>
          <Container fluid>
            <Row style={{ marginTop: 30, marginLeft: 1, marginBottom: 20 }}>
              <Col>
                <Grid item xs={12}>
                  <Paper
                    style={{
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 500,
                      paddingTop: 3,
                      paddingBottom: 18,
                      height: 160,
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
                            style={{
                              alignContent: 'center',
                              justifyContent: 'center',
                            }}
                            onClick={createNewAccount}
                          >
                            Create
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Paper>
                </Grid>
              </Col>
              <Col>
                <Grid item xs={12}>
                  <div
                    style={{
                      alignItems: 'center',
                      alignContent: 'center',
                      padding: 20,
                      width: 400,
                      height: 170,
                      paddingLeft: 45,
                      marginLeft: 120,
                    }}
                    elevation={3}
                  >
                    <Container fluid>
                      <Row>
                        <Paper
                          style={{
                            height: 60,
                            alignContent: 'center',
                            textAlign: 'center',
                            width: 300,
                          }}
                          elevation={1}
                        >
                          <Col style={{}}>
                            Eth Balance
                            <br /> <span style={{fontWeight:"bolder",fontStyle:"italic"}}>{ethTokenBalance}</span>
                          </Col>
                        </Paper>
                      </Row>
                      <Row>
                        <Paper
                          style={{
                            height: 60,
                            alignContent: 'center',
                            textAlign: 'center',
                            width: 300,
                            marginTop: 10,
                          }}
                          elevation={1}
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
                                      <MenuItem
                                        value={account.name}
                                        key={account.key}
                                      >
                                        {account.name}
                                      </MenuItem>
                                    );
                                  })
                                : null}
                            </Select>
                            Account Balance
                            <br /> <span style={{fontWeight:"bolder",fontStyle:"italic"}}>{cordaTokenBalance?cordaTokenBalance:0} Tokens</span>
                          </Col>
                        </Paper>
                      </Row>
                    </Container>
                  </div>
                </Grid>
              </Col>
            </Row>
            <Row>
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
                    onChange={(event) =>
                      setPrivateKey(event.target.value.trim())
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 30 }}
                    onClick={exchange}
                  >
                    Buy Tokens
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
            </Row>
          </Container>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: 19,
            marginLeft: 1000,
            marginBottom: 20,
            width: 125,
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
            alignContent: 'flex-end',
          }}
          onClick={check}
        >
          Refresh
        </Button>
        <FormGroup style={{ background: '#f7f7f7', margin: 5 }}>
          {/* <List dense={true}>
            {claims
              ? claims.map((claim) => {
                  return (
                    <CordaExchangeList claim={claim} key={claim.exchangeId} />
                  );
                })
              : null}
          </List> */}
          <CordaTable claims={claims} />
        </FormGroup>
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
