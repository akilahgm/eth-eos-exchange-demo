import { tokenABI } from "../const/abi";
import {ethTokenAddress,eosTokenAddress,ethEscrowAddress} from '../const'
const Web3 = require("web3");
const web3 = new Web3();


export const generateReadHash = (sendingAmount,expectedAmount) => {
  web3.setProvider(
    new web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3"
    )
  );

  const contract = new  web3.eth.Contract(tokenABI , ethTokenAddress);

  const data = contract.methods.getTransactionStatus(
    info.wallet2,
    info.wallet1,
    info.token2,
    info.token1,
    '10000000000000000000',
    '10000000000000000000'
).encodeABI();

return data

};
