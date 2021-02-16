import { escrowABI,EOSEscrowABI } from '../const/abi';
import axios from 'axios';
import { tokenList,eosExchangeEthEscrow,networkList } from '../const';
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
    var contractAddress = selectedToken.escrow;
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
    const {data} = await axios.post(
      `https://${selectedToken.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_sendRawTransaction',
        params: [hexTx],
      }
    );

    console.log('Result', data);
    return `https://${selectedToken.network}.etherscan.io/tx/${data.result?data.result:''}`
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
  receivingAmount,
  otherTokenAddress
) => {
  try {
    var Tx = require('ethereumjs-tx').Transaction;
    web3.setProvider(
      new web3.providers.HttpProvider(
        `https://${eosExchangeEthEscrow.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`
      )
    );

    const stringArg = [
      eosExchangeEthEscrow.claimHash,
      eosSender,
      eosReceiver,
      ethSender,
      ethReceiver,
      sendingAmount,
      otherTokenAddress,
      receivingAmount,
      exchangeId
    ];

    var count = await web3.eth.getTransactionCount(ethReceiver);
    var contractAddress = eosExchangeEthEscrow.address;
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
      chain: eosExchangeEthEscrow.network,
      hardfork: 'petersburg',
    });

    tx.sign(privKey);

    var serializedTx = tx.serialize();

    let hexTx = '0x' + serializedTx.toString('hex');
    const {data} = await axios.post(
      `https://${eosExchangeEthEscrow.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_sendRawTransaction',
        params: [hexTx],
      }
    );

    console.log('Result', data);
    return `https://${eosExchangeEthEscrow.network}.etherscan.io/tx/${data.result?data.result:''}`;
  } catch (err) {
    console.log('Error', err);
  }
};