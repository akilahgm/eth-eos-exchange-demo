import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAj2CGshlFX4iMlYgQ4HEq0Zp9IjZa7ZTs",
    authDomain: "sa-sea-dev.firebaseapp.com",
    databaseURL: "https://sa-sea-dev.firebaseio.com",
    projectId: "sa-sea-dev",
    storageBucket: "sa-sea-dev.appspot.com",
    messagingSenderId: "773389226150",
    appId: "1:773389226150:web:3db737a92421fb77966467",
    measurementId: "G-1C42DGRV2T"
};
firebase.initializeApp(config);
export default firebase;
