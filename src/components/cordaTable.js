import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Chip from '@material-ui/core/chip';
import { Grid, Button, TextField } from '@material-ui/core';
import {
  getCurrentUser,
  getUserById,
  getUserByEthPubKey,
} from '../services/userService';
import { claim as eosClaim, eosRefund } from '../services/eosService';
import { ethToEosClaim } from '../services/ethClaim';
import { ethRefund } from '../services/ethServices';
import { requestRefund } from '../services/cordaService';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    height: 20,
  },
});

function Row(props) {
  const { claim } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [privateKey, setPrivateKey] = useState(undefined);

  const refundFunction = async (data) => {
    console.log(data);
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    await requestRefund(currentUser.ethKey, privateKey, claim.exchangeId);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root} style={{ height: 50 }}>
        <TableCell align="center" component="th" scope="row">
          {claim.exchangeId}
        </TableCell>
        <TableCell align="center">
          <strong>{claim.ethereumAmount / 10 ** 18 + ' Eth'}</strong>
        </TableCell>
        <TableCell align="center">{claim.numbrOfShares + ' Tokens'}</TableCell>
        <TableCell align="center">
          <strong>{claim.cordaAccount}</strong>
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
          {claim.statusMsg == 'PENDING' ||
          claim.statusMsg === 'REFUND REQUESTING' ? (
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
            <Box margin={0}>
              <Grid
                container
                spacing={3}
                size="small"
                style={{
                  marginBottom: 5,
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid
                  item
                  xs={8}
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
                      onChange={(event) => setPrivateKey(event.target.value)}
                      style={{ marginLeft: 100, width: 600 }}
                    />
                  </div>
                </Grid>
                <Grid item xs={4}>
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
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CordaTable = ({ claims }) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', claims);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Sending amount</TableCell>
            <TableCell align="center">Expecting Amount</TableCell>
            <TableCell align="center">Corda Account</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {claims.map((claim) => (
            <Row key={claim.exchangeId} claim={claim} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CordaTable;
