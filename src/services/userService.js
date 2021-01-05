import firebase from '../config/firebase'
import axios from 'axios'

export const setCurrentUser = (user)=>{
    localStorage.setItem("current-user", JSON.stringify(user));
}
export const getCurrentUser = ()=>{
    const user =localStorage.getItem("current-user");
    return JSON.parse(user)
}

export const saveUser = async (uid,data)=>{
    console.log('Data recieved',{uid,data})
    await firebase.database().ref('user').child(uid).set(data)
}
export const createAccount = async (uid,accountName)=>{
  console.log('Create account',{uid,accountName})
  await axios.post('http://54.85.244.163:10009/api/account',{
    "accountName" :accountName
})
  await firebase.database().ref('user/'+uid).child('account').push(accountName)
}
export const getAccountBalance = async (accountName)=>{
  try{
    console.log('Get account balance',{accountName})
    const result = await axios.get('http://54.85.244.163:10009/api/account-balance?accountName='+accountName)
    console.log('Account balance',result.data)
    return result.data
  }catch(e){
    console.log('Error happen',e)
    return 0
  }
}

export const getAccount = async (uid)=>{
  console.log('Get account',{uid})
  return new Promise((resolve, reject) => {
    const db = firebase.database();
    const ref = db.ref('user/account'+uid);
    ref.on(
      'value',
      snapshot => {
        console.log('***********DATA RETRIEVE FROM DATABASE***********', snapshot.val());
        resolve(snapshot.val());
      },
      errorObject => {
        reject(errorObject);
      }
    );
  });
}

export const getUserById = (uid)=>{
    return new Promise((resolve, reject) => {
        const db = firebase.database();
        const ref = db.ref('user/'+uid);
        ref.on(
          'value',
          snapshot => {
            console.log('***********DATA RETRIEVE FROM DATABASE***********', snapshot.val());
            resolve(snapshot.val());
          },
          errorObject => {
            reject(errorObject);
          }
        );
      });
}

export const getUserByEthPubKey = (key)=>{
  return new Promise((resolve, reject) => {
      const db = firebase.database();
      const ref = db.ref('user');
      ref
        .orderByChild('ethKey')
        .equalTo(key)
        .on('value', snapshot => {
          const result =snapshot.val()
          const user = result[Object.keys(result)[0]];
          resolve(user);
        });
    });
}