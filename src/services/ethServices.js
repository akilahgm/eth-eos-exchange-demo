import { tokenABI } from "../const/abi";
import axios from 'axios'
import {ethTokenAddress,eosTokenAddress,ethEscrowAddress} from '../const'
const Web3 = require("web3");
const web3 = new Web3();

export const ethTransferAndCall = async (ethPublicKey,ethPrivateKey,sendingAmount,expectedAmount,receiverEthWalletPublicKey,readHash) => {
  console.log('ethTransferAndCall called',{ethPublicKey,ethPrivateKey,sendingAmount,expectedAmount,receiverEthWalletPublicKey,readHash})  
  try{
  var Tx = require("ethereumjs-tx").Transaction;
    web3.setProvider(
      new web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3"
      )
    );
    
    var count = await web3.eth.getTransactionCount(
      ethPublicKey
    );
    var contractAddress = ethTokenAddress;
    var contract = new web3.eth.Contract(tokenABI, contractAddress);

    var gasPrice = await web3.eth.getGasPrice();
    var gasLimit = 90000;

    var rawTransaction = {
      from: ethPublicKey,
      nonce: web3.utils.toHex(count),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      to: contractAddress,
      value: "0x",
      data: contract.methods.transferAndCallEscrow(
        ethEscrowAddress,
        receiverEthWalletPublicKey,
        eosTokenAddress,
        sendingAmount,
        expectedAmount,
        readHash
      ).encodeABI(),
    };

    var privKey = new Buffer(
      ethPrivateKey.toUpperCase(),
      "hex"
    );
    var tx = new Tx(rawTransaction, {
      chain: "rinkeby",
      hardfork: "petersburg",
    });

    tx.sign(privKey);

    var serializedTx = tx.serialize();

    let hexTx = "0x" + serializedTx.toString("hex");
    const resp = await axios.post("https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3",{
        jsonrpc: "2.0",
        id: 1,
        method: "eth_sendRawTransaction",
        params: [hexTx],
      })

      console.log('Result',resp)
    return resp;
    }catch(err){
        console.log("Error",err)
    }
 
};
