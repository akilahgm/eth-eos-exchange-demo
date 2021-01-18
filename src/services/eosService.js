import { TextDecoder, TextEncoder } from 'text-encoding';
import { eosOwner,eosExchangeEthEscrow } from '../const';
import axios from 'axios';
const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); // development only
const fetch = require('node-fetch'); // node only; not needed in browsers
const util = require('util');

export const transferEos = async (
  eosSender,
  eosReceiver,
  ethSender,
  ethReceiver,
  eosAmount,
  ethAmount,
  privateKey,
  expectingTokenAddress
) => {
  try {
    const signatureProvider = new JsSignatureProvider([privateKey]);

    const rpc = new JsonRpc('https://kylin.eosn.io', { fetch });

    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
    const result = await api.transact(
      {
        actions: [
          {
            account: eosOwner,
            name: 'trade',
            authorization: [
              {
                actor: eosSender,
                permission: 'owner',
              },
            ],
            data: {
              eos_sender: eosSender,
              eos_receiver: eosReceiver,
              other_sender: ethSender,
              other_receiver: ethReceiver,
              eos_asset: eosAmount + ' FYP',
              other_token: expectingTokenAddress,
              other_value: ethAmount,
              escrow_address: eosExchangeEthEscrow.address,
              ipfs_hash: eosExchangeEthEscrow.transferHash,
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    console.log('Result ->', result);
      return result.transaction_id
  } catch (err) {
    console.log('ERROR HAPPEN', err);
  }
};

export const claim = async (privateKey, senderEosKey, exchangeId) => {
  try {
    const defaultPrivateKey = privateKey; // bob
    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

    const rpc = new JsonRpc('https://kylin.eosn.io', { fetch });

    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });

    const result = await api.transact(
      {
        actions: [
          {
            account: eosOwner,
            name: 'claim',
            authorization: [
              {
                actor: senderEosKey,
                permission: 'owner',
              },
            ],
            data: {
              exchange_id: exchangeId,
              escrow_address: eosExchangeEthEscrow.address,
              ipfs_hash: eosExchangeEthEscrow.claimHash,
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    console.log('Result ->', result);
  } catch (err) {
    console.log('Error happen', err);
  }
};

export const getEosTokenBalance = async (accountAddress) => {
  try {
    const resp = await axios.post(
      'https://kylin.eosn.io/v1/chain/get_currency_balance',
      {
        code: eosOwner,
        symbol: 'FYP',
        account: accountAddress,
        json: true,
      }
    );
    console.log('Eos account balance',resp.data[0])
    return resp.data[0]
  } catch (err) {
    console.log('Error happen', err);
  }
};

export const eosRefund = async (privateKey, senderEosKey, exchangeId) => {
  try {
    const defaultPrivateKey = privateKey; // bob
    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

    const rpc = new JsonRpc('https://kylin.eosn.io', { fetch });

    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });

    const result = await api.transact(
      {
        actions: [
          {
            account: eosOwner,
            name: 'refund',
            authorization: [
              {
                actor: senderEosKey,
                permission: 'owner',
              },
            ],
            data: {
              exchange_id: exchangeId,
              escrow_address: eosExchangeEthEscrow.address,
              ipfs_hash: eosExchangeEthEscrow.refundHash,
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    console.log('Result ->', result);
  } catch (err) {
    console.log('Error happen', err);
  }
};
