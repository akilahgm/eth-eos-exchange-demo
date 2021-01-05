import React, { useState, useEffect } from 'react';
import {
  Button,
  Chip,
  Grid,
  Paper,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { getCurrentUser, getUserById } from '../services/userService';
import { ethClaim } from '../services/ethClaim';
import { ethToEthRefund } from '../services/ethRefund';

export const ClaimListView = ({ claim, network }) => {
  const classes = useStyles();
  const [privateKey, setPrivateKey] = useState(undefined);
  console.log('CLAIM VIEW', claim);
  const claimFunction = async (data) => {
    console.log('Claim', data);
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    await ethClaim(
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
  };
  const refundFunction = async (data) => {
    await ethToEthRefund(
      data.sender,
      data.receiver,
      data.sendingToken,
      data.expectedToken,
      data.sendingAmount,
      data.expectedAmount,
      data.exchangeId,
      privateKey
    );
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
          <div style={{ paddingLeft: 10 }}>{claim.msg}</div>
        ) : null}
        <Grid item xs={6}>
          Sending amount: {claim.sendingAmount / 10 ** 18}
        </Grid>
        <Grid item xs={6}>
          Expecting amount : {claim.expectedAmount / 10 ** 18}
        </Grid>
        {claim.statusMsg === 'NEED_TO_CLAIM' ? (
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
                    claimFunction(claim);
                  }}
                >
                  Claim
                </Button>
              </div>
            </Grid>
          </>
        ) : null}
        {claim.statusMsg === 'PENDING' ||
        claim.statusMsg === 'REFUND REQUESTING' ? (
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
          </>
        ) : null}
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
    width: 500,
  },
}));
