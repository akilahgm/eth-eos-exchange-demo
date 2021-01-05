import React, { useState, useEffect } from 'react';
import {
  Button,
  ListItem,
  Chip,
  Grid,
  Paper,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { getCurrentUser, getUserById,getUserByEthPubKey } from '../services/userService';
import { claim as eosClaim,eosRefund } from '../services/eosService';
import { ethToEosClaim } from '../services/ethClaim';
import {ethRefund} from '../services/ethServices' 
import {requestRefund} from '../services/cordaService'

export const CordaExchangeList = ({ claim }) => {
  const classes = useStyles();
  console.log('CLaim',claim)
  const [privateKey, setPrivateKey] = useState(undefined);

  const refundFunction = async (data) => {
    console.log(data)
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    await requestRefund(currentUser.ethKey,privateKey,claim.exchangeId)
  };
  return (
    <Paper className={classes.root} size="small">
      <Grid container spacing={3} size="small">
        <Grid item xs={6}>
          Exchange id : {claim.exchangeId}
        </Grid>
        <Grid item xs={6}>
            <Chip
              label={claim.statusMsg}
              variant="outlined"
              size="medium"
              style={{
                color: claim.statusMsg == 'SUCCESSFUL' ? 'green' : 'red',
                marginLeft: 20,
              }}
            />
        </Grid>
        {claim.statusMsg !== 'SUCCESSFUL' && claim.msg ? (
      
            <div style={{paddingLeft:10}}>{claim.msg}</div>
        
        ) : null}
        <Grid item xs={6}>
          Sending ethereum balance: {(claim.ethereumAmount)/(10**18)}
        </Grid>
        <Grid item xs={6}>
          Expecting shares : {claim.numbrOfShares}
        </Grid>
        
        {claim.statusMsg === 'PENDING' || claim.statusMsg === 'REFUND REQUESTING'?(
          <>
        <Grid item xs={8}>
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
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => {
                refundFunction(claim);
              }}
            >
              REFUND
            </Button>
          </div>
        </Grid>
        </>):null}
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
    margin: 20,
    background: '#9AEEF1',
    marginBottom: 30,
    width:500
  },
}));
