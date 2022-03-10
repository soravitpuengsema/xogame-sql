import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyClu2O0b_0MWfuqenWAct0QHqYo1xHG4rc",
    authDomain: "xogameg1.firebaseapp.com",
    projectId: "xogameg1",
    storageBucket: "xogameg1.appspot.com",
    messagingSenderId: "81594269941",
    appId: "1:81594269941:web:c71d3217c52048954a85bc"
  };

function initFirebase(){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };