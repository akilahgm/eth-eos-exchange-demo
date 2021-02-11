import axios from 'axios';
import { EOSEscrowABI } from '../const/abi';
import { eosOwner,eosExchangeEthEscrow, eosEndpoint} from '../const';
import {checkCorrespondingId} from './ethServices'

const Web3 = require('web3');
const web3 = new Web3();

export const getExchangeList = async () => {
  try{
    const resp = await axios.post(
        `${eosEndpoint}/v1/chain/get_table_rows`,
        {
          code: eosOwner,
          table: 'exchanges',
          scope: eosOwner,
          index_position: '1',
          key_type: 'name',
          json: true,
          limit: 10000,
        },
        {
          headers:{
            'Content-Type':'application/json',
          }
        }
      );
      const data = resp.data.rows
      console.log('Data received from EOS table',data)
      return data
  }catch(err){
      console.log('Error happen while getting transaction list')
      return []
  }
};

export const findByExchangeKey = async (key)=>{
    const list = await getExchangeList()
    let temp = null
    for (const iterator of list) {
        if(iterator.key === key){
          temp= iterator
        }
    }
    return temp
}

export const checkCorrespondingIdEos = async (correspondingId)=>{
  let list = []
  list = await getExchangeList()
  for (const iterator of list) {
    if(iterator.corresponding_id ===correspondingId){
      return true
    }
}
return false
}

export const findByPubKey = async (key)=>{
    web3.setProvider(
        new web3.providers.HttpProvider(
          `https://${eosExchangeEthEscrow.network}.infura.io/v3/98079c61ec6a4c029817d276104753d3`
        )
      );
    
    var contract = new web3.eth.Contract(EOSEscrowABI, eosExchangeEthEscrow.address);
    let list = []
    list =await getExchangeList()
    const tempList = []
    for (const iterator of list) {
        if(iterator.eos_sender === key){
            tempList.push(iterator)
        }
    }
    const res = []
    for (const iterator of tempList) {
      iterator.exchangeId =iterator.key
      if(iterator.callback_status === 'statusSent'){
        iterator.msg = 'Checking whether other party has completed the transaction.'
      }
      if(iterator.callback_status === "statusReceived" && iterator.corresponding_id){
        iterator.msg = 'Transaction has been processed. Please claim your expected assets'
      }
      if(iterator.callback_status === "statusReceived" && !iterator.corresponding_id){
        iterator.msg = 'You initiated an exchange. Waiting for other party to proceed.'
      }
      if(iterator.callback_status === "refundSent"){
        iterator.msg = 'Checking whether the transaction can be refunded.';
      }
      if(Number(iterator.status) === 0 && iterator.callback_status === "refundReceived"){
        iterator.msg = 'Transaction can not be refunded.'
      }
      if(iterator.corresponding_id && Number(iterator.status) == 1){
        
        const data = await contract.methods.exchangeFromId(iterator.corresponding_id).call();
        if(Number(data.status) ==0){
          iterator.statusMsg = 'NEED_TO_CLAIM'
        }
        if(Number(data.status) ==1){
          iterator.statusMsg = 'SUCCESSFUL'
        }
        if(Number(data.status) ==2){
          iterator.statusMsg = 'SUCCESSFUL'
        }
      }
      if(Number(iterator.status) === 0){
        const isHaveId = await checkCorrespondingId(iterator.key)
        iterator.statusMsg = isHaveId?'SUCCESSFUL':'PENDING'
        
      }
      
      if(Number(iterator.status) === 2){
        iterator.statusMsg = 'SUCCESSFUL'
      }
      if(Number(iterator.status) === 3){
        iterator.statusMsg = 'REFUND REQUESTING'
      }
      if(Number(iterator.status) === 4){
        iterator.statusMsg = 'REFUNDED'
      }
      res.push(iterator)
    }
    return res
}
