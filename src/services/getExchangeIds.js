import { escrowABI,eosExchangableTokenABI,EOSEscrowABI } from '../const/abi';
import { tokenList, eosExchangableEscrow } from '../const';
import {findByExchangeKey,checkCorrespondingIdEos} from './eosExchangeTable'
const Web3 = require('web3');

export const getExchangeIds = async (escrowAddress, walletPubKey) => {
  const web3 = new Web3();
  const web32 = new Web3();
  

  let escrowAddress2 = tokenList[0].escrow;
  if (escrowAddress2 === escrowAddress) {
    escrowAddress2 = tokenList[1].escrow;
  }
  let token1 = null;
    for (const token of tokenList) {
      if (token.escrow === escrowAddress) {
        token1 = token;
      }
    }
    let token2 = null;
    for (const token of tokenList) {
      if (token.escrow === escrowAddress2) {
        token2 = token;
      }
    }

  web3.setProvider(
    new web3.providers.HttpProvider(
      `https://${token1.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`
    )
  );
  web32.setProvider(
    new web3.providers.HttpProvider(
      `https://${token2.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`
    )
  );
  var contract = new web3.eth.Contract(escrowABI, escrowAddress);
  var contract2 = new web32.eth.Contract(escrowABI, escrowAddress2);

  let exchangeIds = await contract.methods
    .getExchangeIds(walletPubKey)
    .call();
    console.log('Ids',exchangeIds)

    // exchangeIds.reverse()
    
  const claim = [];
  for (const exchangeId of exchangeIds) {
    const res = await contract.methods.exchangeFromId(exchangeId).call();
    console.log('RES1',res)
    const temp = {
      status: res.status,
      correspondingId: res.correspondingId,
      exchangeId: res.exchangeId,
      expectedToken: res.expectedToken,
      expectedAmount: res.expectedAmount,
      sendingToken: res.sendingToken,
      sendingAmount: res.sendingAmount,
      receiver: res.receiver,
      sender: res.sender,
      statusMsg: '',
      callbackStatus:res.callbackStatus
    };
    if(res.callbackStatus === 'statusSent'){
      temp.msg = 'Checking whether other party has completed the transaction.'
    }
    if(res.callbackStatus === "statusReceived" && Number(res.correspondingId)){
      temp.msg = 'Transaction has been processed. Please claim your expected assets'
    }
    if(res.callbackStatus === "statusReceived" && !Number(res.correspondingId)){
      temp.msg = 'You initiated an exchange. Waiting for other party to proceed.'
    }
    if(res.callbackStatus === "refundSent"){
      temp.msg = 'Checking whether the transaction can be refunded.'
    }

    if(res.callbackStatus === "refundReceived" && Number(res.status) === 0){
      temp.msg = 'Transaction can not be refunded.'
    }
    if (Number(res.status) === 1) {
      const res2 = await contract2.methods
        .exchangeFromId(res.correspondingId)
        .call();
        console.log('RES2',res2)
      if (Number(res2.status) == 0) {
        temp.statusMsg = 'NEED_TO_CLAIM';
        if(res2.callbackStatus === 'claimSent'){
          temp.msg = 'Claim request sent. Waiting for confirmation.'
        }
      }
      if (Number(res2.status) == 1) {
        temp.statusMsg = 'SUCCESSFUL';
      }
      if (Number(res2.status) == 2) {
        temp.statusMsg = 'SUCCESSFUL';
      }
    } 
    if (Number(res.status) === 0) {
      const isHave = await contract2.methods
        .receivedCorrespondingIds(res.exchangeId)
        .call();
        console.log('*******CHECK CORRESPONDING ID',isHave)
        if(isHave){
          temp.statusMsg = 'SUCCESSFUL';
        }else{
          temp.statusMsg = 'PENDING';
        }
    }
    if(Number(res.status) === 2){
      temp.statusMsg = 'SUCCESSFUL'
    }
    if(Number(res.status) === 3){
      temp.statusMsg = 'REFUND REQUESTING'
    }
    if(Number(res.status) === 4){
      temp.statusMsg = 'REFUNDED'
    }

    claim.push(temp);
  }

  return claim;
};

export const getEthExchanges = async (walletPubKey) => {
  const web3 = new Web3();
  web3.setProvider(
    new web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/98079c61ec6a4c029817d276104753d3'
    )
  );

  var contract = new web3.eth.Contract(EOSEscrowABI, eosExchangableEscrow);

  const exchangeIds = await contract.methods
    .getExchangeIds(walletPubKey)
    .call();
    console.log('Exchnage ids',exchangeIds)
  const claim = [];
  for (const exchangeId of exchangeIds) {
    
    const res = await contract.methods.exchangeFromId(exchangeId).call();
    console.log('res',res)
    const temp = {
      status: res.status,
      correspondingId: res.correspondingId,
      exchangeId: res.exchangeId,
      expectedAsset: res.expectedAsset,
      sendingToken: res.sendingToken,
      sendingAmount: res.sendingAmount,
      receiver: res.receiver,
      sender: res.sender,
      statusMsg: '',
    };
    if(res.callbackStatus === 'statusSent'){
      temp.msg = 'Checking whether other party has completed the transaction.'
    }
    if(res.callbackStatus === "statusReceived" && res.correspondingId){
      temp.msg = 'Transaction has been processed. Please claim your expected assets'
    }
    if(res.callbackStatus === "statusReceived" && !res.correspondingId){
      temp.msg = 'You initiated an exchange. Waiting for other party to proceed.'
    }
    if(res.callbackStatus === "refundSent"){
      temp.msg = 'Checking whether the transaction can be refunded.'
    }

    if(res.callbackStatus === "refundReceived" && Number(res.status) === 0){
      temp.msg = 'Transaction can not be refunded.'
    }

    if(res.correspondingId && Number(res.status) == 1){
      const data = await findByExchangeKey(res.correspondingId)
      
      if(Number(data.status) ==0){
        temp.statusMsg = 'NEED_TO_CLAIM'
        // if(data.callbackStatus === 'claimSent'){
        //   temp.msg = 'Claim request sent. Waiting for confirmation.'
        // }
      }
      if(Number(data.status) ==1){
        temp.statusMsg = 'SUCCESSFUL'
      }
      if(Number(data.status) ==2){
        temp.statusMsg = 'SUCCESSFUL'
      }
      
    }
    if(Number(res.status) === 0){
      const isHaveId =await checkCorrespondingIdEos(res.exchangeId)
      temp.statusMsg = isHaveId?'SUCCESSFUL':'PENDING'
    }
    if(Number(res.status) === 2){
      temp.statusMsg = 'SUCCESSFUL'
    }
    if(Number(res.status) === 3){
      temp.statusMsg = 'REFUND REQUESTING'
    }
    if(Number(res.status) === 4){
      temp.statusMsg = 'REFUNDED'
    }

    claim.push(temp);
  }

  return claim;
};
