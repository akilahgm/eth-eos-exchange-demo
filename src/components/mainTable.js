import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CallMadeIcon from '@material-ui/icons/CallMade';
import Chip from '@material-ui/core/chip';
import { Grid, Button, TextField } from '@material-ui/core';
import {
  getCurrentUser,
  getUserById,
  getUserByEthPubKey,
} from '../services/userService';
import { claim as eosClaim, eosRefund } from '../services/eosService';
import { ethRefund } from '../services/ethServices';
import { ethClaim, ethToEosClaim } from '../services/ethClaim';
import { ethToEthRefund } from '../services/ethRefund';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    height: 20,
  },
});

function Row(props) {
  const { claim, network } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [privateKey, setPrivateKey] = useState(undefined);
  const [transactionLink, setTransactionLink] = useState(undefined);
  const claimFunction = async (data) => {
    setTransactionLink(undefined);
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    if (network === 'ETH') {
      const link = await eosClaim(
        privateKey,
        currentUser.eosKey,
        claim.correspondingId
      );
      setTransactionLink(link);
    } else if (network === 'EOS') {
      const link = await ethToEosClaim(
        privateKey,
        data.corresponding_id,
        data.other_sender,
        data.other_receiver,
        data.eos_sender,
        data.eos_receiver,
        data.eos_asset,
        data.other_value,
        data.other_token
      );
      setTransactionLink(link);
    } else {
      const link = await ethClaim(
        network,
        currentUser.ethKey,
        privateKey,
        data.receiver,
        data.expectedToken,
        data.sendingToken,
        data.sendingAmount,
        data.expectedAmount,
        data.correspondingId
      );
      setTransactionLink(link);
    }
  };
  const refundFunction = async (data) => {
    setTransactionLink(undefined);
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    if (network === 'ETH') {
      const receiver = await getUserByEthPubKey(data.receiver);
      const link = await ethRefund(
        privateKey,
        data.exchangeId,
        data.sender,
        data.receiver,
        receiver.eosKey,
        currentUser.eosKey,
        data.sendingAmount,
        data.expectedAsset,
        data.sendingToken
      );
      setTransactionLink(link);
    } else if (network === 'EOS') {
      const link = await eosRefund(
        privateKey,
        data.eos_sender,
        data.exchangeId
      );
      setTransactionLink(link);
    } else {
      const link = await ethToEthRefund(
        data.sender,
        data.receiver,
        data.sendingToken,
        data.expectedToken,
        data.sendingAmount,
        data.expectedAmount,
        data.exchangeId,
        privateKey
      );
      setTransactionLink(link);
    }
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root} style={{ height: 50 }}>
        <TableCell align="center" component="th" scope="row">
          {claim.exchangeId}
        </TableCell>
        <TableCell align="center">
          <strong>
            {network === 'EOS'
              ? claim.eos_asset
              : network === 'ETH'
              ? claim.sendingAmount / 10 ** 18
              : claim.sendingAmount / 10 ** 18}
          </strong>
        </TableCell>
        <TableCell align="center">
          {network === 'EOS'
            ? claim.other_value / 10 ** 18
            : network === 'ETH'
            ? claim.expectedAsset
            : claim.expectedAmount / 10 ** 18}
        </TableCell>
        <TableCell align="center">
          <i> {claim.receiver ? claim.receiver : claim.other_receiver}</i>
        </TableCell>
        <TableCell align="center">
          <Chip
            label={claim.statusMsg}
            size="small"
            style={{
              color: '#fff',
              marginLeft: 20,
              background:
                claim.statusMsg == 'SUCCESSFUL'
                  ? '#05CC1F'
                  : claim.statusMsg == 'PENDING'
                  ? '#FCC60E'
                  : claim.statusMsg === 'PROCESSED'
                  ? '#2AA7F5'
                  : '#DA461F',
              fontSize: 10,
              minWidth: 90,
              fontWeight: 'bold',
            }}
          />
        </TableCell>
        <TableCell align="center">
          {claim.statusMsg === 'PENDING' ||
          claim.statusMsg === 'REFUND REQUESTING' ||
          claim.statusMsg === 'PROCESSED' ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={0} style={{ background: '#fafafa', borderRadius: 5 }}>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: 'left',
                  marginLeft: 30,
                  marginTop: 10,
                  paddingTop: 10,
                }}
              >
                {claim.statusMsg !== 'SUCCESSFUL' && claim.msg ? (
                  <div
                    style={{
                      paddingLeft: 10,
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                    }}
                  >
                    {claim.msg}
                  </div>
                ) : null}
              </Grid>
              {claim.statusMsg === 'PENDING' ||
              claim.statusMsg === 'REFUND REQUESTING' ? (
                <div>
                  <Grid
                    container
                    spacing={3}
                    size="small"
                    style={{
                      paddingBottom: 30,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 20,
                    }}
                  >
                    <Grid
                      item
                      xs={6}
                      style={{ alignContent: 'center', alignItems: 'center' }}
                    >
                      <div>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="privateKey"
                          label="Wallet private key"
                          name="privateKey"
                          autoComplete="privateKey"
                          autoFocus
                          size="small"
                          onChange={(event) =>
                            setPrivateKey(event.target.value)
                          }
                          style={{ marginLeft: 35, width: 550 }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={() => {
                          refundFunction(claim);
                        }}
                        style={{ marginLeft: 0 }}
                      >
                        REFUND
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                    {transactionLink?(<div>
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          style={{
                            marginLeft: 30,
                            background: 'green',
                            color: 'white',
                            width:160,
                          }}
                          onClick={() => {
                            window.open(transactionLink, '_blank');
                          }}
                        >
                          View Result <CallMadeIcon style={{ color: "#fff",marginLeft:5 }} fontSize={"small"} />
                        </Button>
                        
                      </div>):null}
                    </Grid>
                  </Grid>
                </div>
              ) : null}
              {claim.statusMsg === 'PROCESSED' ? (
                <>
                  <Grid
                    container
                    spacing={3}
                    size="small"
                    style={{
                      paddingBottom: 30,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 20,
                    }}
                  >
                    <Grid item xs={6}>
                      <div>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="privateKey"
                          label="Wallet private key"
                          name="privateKey"
                          autoComplete="privateKey"
                          autoFocus
                          size="small"
                          onChange={(event) =>
                            setPrivateKey(event.target.value)
                          }
                          style={{ marginLeft: 30, width: 550 }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={1}>
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          onClick={() => {
                            claimFunction(claim);
                          }}
                        >
                          Claim
                        </Button>
                      </div>
                    </Grid>
                    
                    <Grid item xs={2}>
                    {transactionLink?(<div>
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          style={{
                            marginLeft: 30,
                            background: 'green',
                            color: 'white',
                          }}
                          onClick={() => {
                            window.open(transactionLink, '_blank');
                          }}
                        >
                          View Result 
                        </Button>
                       
                      </div>):null}
                    </Grid>
                  </Grid>
                </>
              ) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const MainTable = ({ claims, network }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Sending amount</TableCell>
            <TableCell align="center">Expecting Amount</TableCell>
            <TableCell align="center">Receiver Account</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim) => (
            <Row key={claim.exchangeId} claim={claim} network={network} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
