import { cordaEscrowContractAddress } from '../const';
import { cordaEscrowABI } from '../const/abi';
import axios from 'axios';
const Web3 = require('web3');
const web3 = new Web3();

export const buyShares = async (
  publicKey,
  privateKey,
  ethAmount,
  cordaAccount,
  expectedShares
) => {
  var Tx = require('ethereumjs-tx').Transaction;
  web3.setProvider(
    new web3.providers.HttpProvider(
      `https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3`
    )
  );

  var count = await web3.eth.getTransactionCount(publicKey);
  var contractAddress = cordaEscrowContractAddress;
  var contract = new web3.eth.Contract(cordaEscrowABI, contractAddress);

  var gasPrice = await web3.eth.getGasPrice();
  var gasLimit = 1000000;

  var rawTransaction = {
    from: publicKey,
    nonce: web3.utils.toHex(count),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    value: web3.utils.toHex(expectedShares * 10 ** 16),
    data: contract.methods
      .createExchange(cordaAccount, expectedShares)
      .encodeABI(),
  };
  var privKey = new Buffer(privateKey.toUpperCase(), 'hex');
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

  console.log('Result', resp.data);
  return resp.data.result ? resp.data.result : null;
};
export const getAllExchanges = async ()=>{
  web3.setProvider(
    new web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3',
    ),
  );
  var contractAddress = cordaEscrowContractAddress;
  var contract = new web3.eth.Contract(cordaEscrowABI, contractAddress);
  const ids = await contract.methods.getAllExchangeIds().call();
  console.log('Ids-----',ids)
  const results = [];
  for (const iterator of ids) {
    const res = await contract.methods.exchangeFromId(iterator).call();
    if (res.status == '0') {
      res.statusMsg = 'PENDING';
    }
    if (res.status == '1') {
      res.statusMsg = 'SUCCESSFUL';
    }
    if (res.status == '2') {
      res.statusMsg = 'REFUND REQUESTING';
    }
    if (res.status == '3') {
      res.statusMsg = 'REFUNDED';
    }
    results.push(res);
  }
  return results;
}

export const getOrgAvailableStockBalance = async()=>{
  const {data} = await axios.get('http://20.42.117.153:10009/api/available-tokens?symbol=fyp')
  return data
}

export const getExchanges = async (accountAddress) => {
  web3.setProvider(
    new web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
    )
  );

  var contract = new web3.eth.Contract(
    cordaEscrowABI,
    cordaEscrowContractAddress
  );
  const ids = await contract.methods.getUserExchangeIds(accountAddress).call();
  console.log('Exchange ids', ids);
  const results = [];
  for (const iterator of ids) {
    const res = await contract.methods.exchangeFromId(iterator).call();
    console.log('result', res);
    if (res.status == '0') {
      res.statusMsg = 'PENDING';
    }
    if (res.status == '1') {
      res.statusMsg = 'SUCCESSFUL';
    }
    if (res.status == '2') {
      res.statusMsg = 'REFUND REQUESTING';
    }
    if (res.status == '3') {
      res.statusMsg = 'REFUNDED';
    }

    results.push(res);
  }
  return results;
};

export const requestRefund = async (publicKey, privateKey, exchangeId) => {
  var Tx = require('ethereumjs-tx').Transaction;
  web3.setProvider(
    new web3.providers.HttpProvider(
      `https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3`
    )
  );

  var count = await web3.eth.getTransactionCount(publicKey);
  var contractAddress = cordaEscrowContractAddress;
  var contract = new web3.eth.Contract(cordaEscrowABI, contractAddress);

  var gasPrice = await web3.eth.getGasPrice();
  var gasLimit = 1000000;

  var rawTransaction = {
    from: publicKey,
    nonce: web3.utils.toHex(count),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    value: '0x',
    data: contract.methods.requestRefund(exchangeId).encodeABI(),
  };
  var privKey = new Buffer(privateKey.toUpperCase(), 'hex');
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

  console.log('Result', resp.data);
  return resp.data.result ? resp.data.result : null;
};
