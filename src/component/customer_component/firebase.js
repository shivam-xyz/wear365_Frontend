import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyAAf-hmHSCzR9275YodACvutCxTgYbqGD0",
    authDomain: "mernfire-20002.firebaseapp.com",
    projectId: "mernfire-20002",
    storageBucket: "mernfire-20002.appspot.com",
    messagingSenderId: "226439894437",
    appId: "1:226439894437:web:d0014acb50439b8687c44c"    

};

const inst = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()

export { auth, firebase, inst }





// apiKey: "AIzaSyBlvwurAba3QBxNNoBx8RI_FlJiPYrKqrU",
// authDomain: "mernfire2.firebaseapp.com",
// projectId: "mernfire2",
// storageBucket: "mernfire2.appspot.com",
// messagingSenderId: "416443282478",
// appId: "1:416443282478:web:20edd01711c7cc5f76dbbf"