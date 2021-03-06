import { tokenABI, eosExchangableTokenABI,EOSEscrowABI,escrowABI } from '../const/abi';
import axios from 'axios';
import { tokenList, eosExchangableToken, eosExchangableEscrow } from '../const';
import { generateReadHash } from './generateReadHash';
const Web3 = require('web3');
const web3 = new Web3();

export const ethTransferAndCall = async (
  ethPublicKey,
  ethPrivateKey,
  sendingAmount,
  expectedAmount,
  receiverEthWalletPublicKey,
  expectedTokenAddress,
  sendingTokenAddress
) => {
  try {
    let sendingToken = null;
    for (const token of tokenList) {
      if (token.address === sendingTokenAddress) {
        sendingToken = token;
      }
    }
    if (!sendingToken) {
      throw new Error('token not found');
    }
    console.log('SENDING TOKEN',sendingToken)
 
    var Tx = require('ethereumjs-tx').Transaction;
    web3.setProvider(
      new web3.providers.HttpProvider(
        `https://${sendingToken.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`
      )
    );
    

    const readHash = await generateReadHash(
      ethPublicKey,
      receiverEthWalletPublicKey,
      expectedTokenAddress,
      sendingTokenAddress,
      sendingAmount,
      expectedAmount
    );

    var count = await web3.eth.getTransactionCount(ethPublicKey);
    var contractAddress = sendingTokenAddress;
    var contract = new web3.eth.Contract(tokenABI, contractAddress);

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
        .transferAndCallEscrow(
          sendingToken.escrow,
          receiverEthWalletPublicKey,
          expectedTokenAddress,
          sendingAmount,
          expectedAmount,
          readHash
        )
        .encodeABI(),
    };

    var privKey = new Buffer(ethPrivateKey.toUpperCase(), 'hex');
    var tx = new Tx(rawTransaction, {
      chain: sendingToken.network,
      hardfork: 'petersburg',
    });

    tx.sign(privKey);

    var serializedTx = tx.serialize();

    let hexTx = '0x' + serializedTx.toString('hex');
    const resp = await axios.post(
      `https://${sendingToken.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_sendRawTransaction',
        params: [hexTx],
      }
    );
    const id = resp.data.result?resp.data.result:null;
    console.log('ETH - ETH Result', resp.data);
    return `https://${sendingToken.network}.etherscan.io/tx/${id}`;
  } catch (err) {
    console.log('Error', err);
  }
};

export const ethToEosTransferAndCall = async (
  ethSenderPublicKey,
  ethReceiverPublicKey,
  ethPrivateKey,
  sendingAmount,
  expectedAmount,
  ethSenderEosPubKey,
  ethReceiverEosPubKey
) => {
  try {
    var Tx = require('ethereumjs-tx').Transaction;
    web3.setProvider(
      new web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
      )
    );

    const stringArg = [
      'QmdhmV9xexak64R96EBdNPE4KwpSwNTeP1716J8Rg8SXeu',
      ethReceiverEosPubKey,
      ethSenderEosPubKey,
      ethSenderPublicKey,
      ethReceiverPublicKey,
      expectedAmount + ' FYP',
      eosExchangableToken,
      sendingAmount,
    ];

    var count = await web3.eth.getTransactionCount(ethSenderPublicKey);
    var contractAddress = eosExchangableToken;
    var contract = new web3.eth.Contract(
      eosExchangableTokenABI,
      contractAddress
    );

    var gasPrice = await web3.eth.getGasPrice();
    var gasLimit = 1000000;

    var rawTransaction = {
      from: ethSenderPublicKey,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      value: '0x',
      data: contract.methods
        .transferAndCallEscrow(
          eosExchangableEscrow,
          ethReceiverPublicKey,
          sendingAmount,
          expectedAmount + ' FYP',
          stringArg
        )
        .encodeABI(),
    };

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

    console.log('Result', resp.data);
    return resp.data.result?resp.data.result:null;
  } catch (err) {
    console.log('Error', err);
  }
};


export const getEthTokenBalance = async (accountAddress) =>{
  try{
    web3.setProvider(
      new web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
      )
    );
  
    var contract = new web3.eth.Contract(eosExchangableTokenABI, eosExchangableToken);
    const res = await contract.methods.balanceOf(accountAddress).call();
    console.log('Ethereum Balance',res/(10**18))
    return res/(10**18)
  }catch(err){
    console.log('Error', err);
  }
}

export const getEthBalance = async (accountAddress) =>{
  try{
    web3.setProvider(
      new web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
      )
    );
  
    const balance =await web3.eth.getBalance(accountAddress);
    const ethBalance = Math.round((balance/(10**18) + Number.EPSILON) * 10000) / 10000
    console.log('Ethereum Balance',{balance:ethBalance,accountAddress})
    return ethBalance
  }catch(err){
    console.log('Error', err);
  }
}

export const getEthEthTokenBalance = async (accountAddress,network) =>{
  try{
    web3.setProvider(
      new web3.providers.HttpProvider(
        `https://${network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`
      )
    );
    let address = null;
    for (const token of tokenList) {
      if (token.network === network) {
        address = token.address;
      }
    }
  
    var contract = new web3.eth.Contract(tokenABI, address);
    const res = await contract.methods.balanceOf(accountAddress).call();
    console.log('Ethereum Balance',res/(10**18))
    return res/(10**18)
  }catch(err){
    console.log('Error', err);
  }
}

export const ethRefund = async (
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
      'QmYdWZZyika9phSDZM245EAYKPHxnWXprMrW1Dt5MARE6b',
      eosSender,
      eosReceiver,
      ethSender,
      ethReceiver,
      sendingAmount,
      eosExchangableToken,
      receivingAmount,
      exchangeId
    ];

    var count = await web3.eth.getTransactionCount(ethSender);
    var contractAddress = eosExchangableEscrow;
    var contract = new web3.eth.Contract(EOSEscrowABI, contractAddress);

    var gasPrice = await web3.eth.getGasPrice();
    var gasLimit = 1000000;

    var rawTransaction = {
      from: ethSender,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      value: '0x',
      data: contract.methods
        .requestRefund(exchangeId, stringArg)
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


export const checkCorrespondingId = async (correspondingId)=>{
  web3.setProvider(
    new web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
    )
  );

  var contract = new web3.eth.Contract(EOSEscrowABI, eosExchangableEscrow);

  const isHaveId = await contract.methods
    .receivedCorrespondingIds(correspondingId)
    .call();
    console.log('Check Corresponding Id',isHaveId)
    return isHaveId
}