import React, { useState, useEffect } from 'react';
import {
  Button,
  Chip,
  Grid,
  Paper,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { getCurrentUser, getUserById,getUserByEthPubKey } from '../services/userService';
import { ethClaim, ethToEosClaim } from '../services/ethClaim';
import { ethToEthRefund } from '../services/ethRefund';
import { claim as eosClaim, eosRefund } from '../services/eosService';
import {ethRefund} from '../services/ethServices'

export const ClaimListView = ({ claim, network }) => {
  const classes = useStyles();
  const [privateKey, setPrivateKey] = useState(undefined);
  const claimFunction = async (data) => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    if (network === 'ETH') {
      await eosClaim(privateKey, currentUser.eosKey, claim.correspondingId);
    } else if (network === 'EOS') {
      await ethToEosClaim(
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
    } else {
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
    }
  };
  const refundFunction = async (data) => {
    const currentUserUid = getCurrentUser().uid;
    const currentUser = await getUserById(currentUserUid);
    if (network === 'ETH') {
      const receiver = await getUserByEthPubKey(data.receiver);
      await ethRefund(
        privateKey,
        data.exchangeId,
        data.sender,
        data.receiver,
        receiver.eosKey,
        currentUser.eosKey,
        data.sendingAmount,
        data.expectedAsset,
        data.sendingToken,
      );
    } else if (network === 'EOS') {
      await eosRefund(privateKey, data.eos_sender, data.exchangeId);
    } else {
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
    }
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
          Sending amount:{' '}
          {network === 'EOS'
            ? claim.eos_asset
            : network === 'ETH'
            ? claim.sendingAmount / 10 ** 18
            : claim.sendingAmount / 10 ** 18}
        </Grid>
        <Grid item xs={6}>
          Expecting amount :{' '}
          {network === 'EOS'
            ? claim.other_value / 10 ** 18
            : network === 'ETH'
            ? claim.expectedAsset
            : claim.expectedAmount / 10 ** 18}
        </Grid>
        {claim.statusMsg === 'PROCESSED' ? (
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
