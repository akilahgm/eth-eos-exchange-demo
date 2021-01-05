import { escrowABI } from '../const/abi';
import axios from 'axios';
import { tokenList } from '../const';
import { generateGetRefundabilityReadHack } from './generateReadHash';
const Web3 = require('web3');
const web3 = new Web3();

export const ethToEthRefund = async (
    senderWalletPubKey,
    receiverWalletPubKey,
    sendingToken,
    expectedToken,
    sendingAmount,
    expectedAmount,
    exchangeId,
    privateKey
) => {
  try {
    let selectedToken = null;
    for (const token of tokenList) {
      if (token.address === sendingToken) {
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

    const readHash = await generateGetRefundabilityReadHack(
        senderWalletPubKey,
        receiverWalletPubKey,
        sendingToken,
        expectedToken,
        sendingAmount,
        expectedAmount,
        exchangeId
    );

    var count = await web3.eth.getTransactionCount(senderWalletPubKey);
    var contractAddress = selectedToken.escrow;
    var contract = new web3.eth.Contract(escrowABI, contractAddress);

    var gasPrice = await web3.eth.getGasPrice();
    var gasLimit = 1000000;

    var rawTransaction = {
      from: senderWalletPubKey,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      value: '0x',
      data: contract.methods
        .requestRefund(exchangeId, readHash)
        .encodeABI(),
    };
    console.log('RAW TRAN',rawTransaction)

    var privKey = new Buffer(privateKey.toUpperCase(), 'hex');
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