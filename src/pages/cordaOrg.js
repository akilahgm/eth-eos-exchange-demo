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
import { getExchanges, buyShares,getAllExchanges,getOrgAvailableStockBalance } from '../services/cordaService';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import CordaOrgTable from '../components/CordaOrgTable';

function CordaOrg() {
  const styles = useStyles();
  const [active, setActive] = useState(false);
  const [claims, setClaim] = useState([]);
  const [resultLink, setResultLink] = useState(undefined);

  const [selectedCordaAccount, setSelectedCordaAccount] = useState(0);
  const [cordaTokenBalance, setCordaTokenBalance] = useState(0);
  const [ethTokenBalance, setEthTokenBalance] = useState(0);


  const updateBalance = async () => {
    
    const ethBalance = await getEthBalance('0xd383E9fFd9Fa749a71F7C1d4E08ed67fE00A4214');
    setEthTokenBalance(ethBalance);

    const cordaBalance = await getOrgAvailableStockBalance()
    setCordaTokenBalance(cordaBalance);
  };
  const check = async () => {
    setActive(true);
    updateBalance();
    const claimRes = await getAllExchanges();
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
                  <Container fluid>
                    <Row>
                      <Paper
                        style={{
                          height: 60,
                          alignContent: 'center',
                          textAlign: 'center',
                          width: 300,
                        }}
                        elevation={3}
                      >
                        <Col style={{}}>
                          Organization Eth Account Balance
                          <br /> <strong><i>{ethTokenBalance}</i></strong>
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
                        elevation={3}
                      >
                        <Col>
                          Available Stocks
                          <br /> <strong><i>{cordaTokenBalance}</i></strong>
                        </Col>
                      </Paper>
                    </Row>
                  </Container>
                </Grid>
              </Col>
              <Col></Col>
            </Row>
          </Container>
        </Grid>
        <FormGroup style={{ background: '#f7f7f7',display: 'flex', }} row>
          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              marginRight:80,
              marginTop:10,
              marginBottom:20
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 'auto' }}
              onClick={check}
            >
              Refresh
            </Button>
          </div>
        </FormGroup>
        <FormGroup style={{ background: '#f7f7f7' }} row>
          <CordaOrgTable claims={claims} />
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

export default CordaOrg;
