import { escrowABI } from '../const/abi';
const Web3 = require('web3');

export const generateReadHash = (
  senderWalletPubKey,
  receiverWalletPubKey,
  expectedToken,
  sendingToken,
  sendingAmount,
  expectedAmount
) => {
  const web3 = new Web3();
  web3.setProvider(
    new web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
    )
  );
  const contract = new web3.eth.Contract(escrowABI, sendingToken);

  const data = contract.methods
    .getTransactionStatus(
      receiverWalletPubKey,
      senderWalletPubKey,
      expectedToken,
      sendingToken,
      expectedAmount,
      sendingAmount
    )
    .encodeABI();
  return data;
};

export const generateClaimReadHash = async (
  senderWalletPubKey,
  receiverWalletPubKey,
  expectedToken,
  sendingToken,
  sendingAmount,
  expectedAmount,
  exchangeId
) => {
  const web3 = new Web3();
  web3.setProvider(
    new web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
    )
  );
  const contract = new web3.eth.Contract(escrowABI, sendingToken);
  const data = contract.methods
    .getClaimability(
      senderWalletPubKey,
      receiverWalletPubKey,
      sendingToken,
      expectedToken,
      sendingAmount,
      expectedAmount,
      exchangeId
    )
    .encodeABI();
  return data;
};


export const generateGetRefundabilityReadHack = async (
  senderWalletPubKey,
  receiverWalletPubKey,
  expectedToken,
  sendingToken,
  sendingAmount,
  expectedAmount,
  exchangeId
) => {
  const web3 = new Web3();
  web3.setProvider(
    new web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
    )
  );
  const contract = new web3.eth.Contract(escrowABI, sendingToken);
  const data = contract.methods
    .getRefundability(
      senderWalletPubKey,
      receiverWalletPubKey,
      sendingToken,
      expectedToken,
      sendingAmount,
      expectedAmount,
      exchangeId
    )
    .encodeABI();
  return data;
};