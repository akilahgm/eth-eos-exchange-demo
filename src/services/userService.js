import firebase from '../config/firebase'
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