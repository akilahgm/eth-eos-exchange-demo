const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util'); 

const defaultPrivateKey = "5K67xb33cCpF2UGVNtEUsnR46PdXE4WnNBYxBedusvSojfsp6Qw"; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://kylin.eosn.io', { fetch });


const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

const func =async () => {
    const result = await api.transact({
      actions: [{
        account: 'fypeostest15',
        name: 'trade',
        authorization: [{
          actor: 'fypeostest15',
          permission: 'owner',
        }],
        data: {
            "eos_sender": "fypeostest15",
            "eos_receiver": "fypeostest14",
            "other_sender": "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
            "other_receiver": "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
            "eos_asset": "200 HIA",
            "other_token": "NUU",
            "other_value": "150",
            "read_hash": "teststring"
          },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    console.dir(result);
  }

  func()