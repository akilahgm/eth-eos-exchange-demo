import { escrowABI,EOSEscrowABI } from '../const/abi';
import axios from 'axios';
import { tokenList,eosExchangableToken,eosExchangableEscrow } from '../const';
import { generateClaimReadHash } from './generateReadHash';
const Web3 = require('web3');
const web3 = new Web3();

export const ethClaim = async (
  sendingEscrow,
  ethPublicKey,
  ethPrivateKey,
  receiverWalletPubKey,
  expectedToken,
  sendingToken,
  sendingAmount,
  expectedAmount,
  exchangeId
) => {

  try {
    let selectedToken = null;
    for (const token of tokenList) {
      if (token.address === expectedToken) {
        selectedToken = token;
      }
    }
    console.log('SELECTED TOKEN',selectedToken)
    var Tx = require('ethereumjs-tx').Transaction;
    web3.setProvider(
      new web3.providers.HttpProvider(
        `https://${selectedToken.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`
      )
    );

    let receivingEscrow = tokenList[0].escrow;
    if (receivingEscrow === sendingEscrow) {
      receivingEscrow = tokenList[1].escrow;
    }

    const readHash = await generateClaimReadHash(
      ethPublicKey,
      receiverWalletPubKey,
      expectedToken,
      sendingToken,
      sendingAmount,
      expectedAmount,
      exchangeId
    );

    var count = await web3.eth.getTransactionCount(ethPublicKey);
    var contractAddress = receivingEscrow;
    var contract = new web3.eth.Contract(escrowABI, contractAddress);

    var gasPrice = await web3.eth.getGasPrice();
    var gasLimit = 1000000;

    var rawTransaction = {
      from: ethPublicKey,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      value: '0x',
      data: contract.methods
        .claimTokens(exchangeId, readHash)
        .encodeABI(),
    };
    console.log('RAW TRAN',rawTransaction)

    var privKey = new Buffer(ethPrivateKey.toUpperCase(), 'hex');
    var tx = new Tx(rawTransaction, {
      chain: selectedToken.network,
      hardfork: 'petersburg',
    });

    tx.sign(privKey);

    var serializedTx = tx.serialize();

    let hexTx = '0x' + serializedTx.toString('hex');
    const resp = await axios.post(
      `https://${selectedToken.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_sendRawTransaction',
        params: [hexTx],
      }
    );

    console.log('Result', resp);
    return resp;
  } catch (err) {
    console.log('Error', err);
  }
};


export const ethToEosClaim = async (
  ethPrivateKey,
  exchangeId,
  ethSender,
  ethReceiver,
  eosSender,
  eosReceiver,
  sendingAmount,
  receivingAmount
) => {

  try {
    var Tx = require('ethereumjs-tx').Transaction;
    web3.setProvider(
      new web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
      )
    );

    const stringArg = [
      'QmYYJGZHGshpnbAimds1d1q9gq35x2cDP3uiJstp3g1Pya',
      eosSender,
      eosReceiver,
      ethSender,
      ethReceiver,
      sendingAmount,
      eosExchangableToken,
      receivingAmount,
      exchangeId
    ];

    var count = await web3.eth.getTransactionCount(ethReceiver);
    var contractAddress = eosExchangableEscrow;
    var contract = new web3.eth.Contract(EOSEscrowABI, contractAddress);

    var gasPrice = await web3.eth.getGasPrice();
    var gasLimit = 1000000;

    var rawTransaction = {
      from: ethReceiver,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      value: '0x',
      data: contract.methods
        .claimTokens(exchangeId, stringArg)
        .encodeABI(),
    };

    console.log('Raw',rawTransaction)

    var privKey = new Buffer(ethPrivateKey.toUpperCase(), 'hex');
    var tx = new Tx(rawTransaction, {
      chain: 'rinkeby',
      hardfork: 'petersburg',
    });

    tx.sign(privKey);

    var serializedTx = tx.serialize();

    let hexTx = '0x' + serializedTx.toString('hex');
    const resp = await axios.post(
      'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3',
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_sendRawTransaction',
        params: [hexTx],
      }
    );

    console.log('Result', resp);
    return resp;
  } catch (err) {
    console.log('Error', err);
  }
};