const {getFirestore, doc, deleteDoc} = require("firebase/firestore");
const {initializeApp} = require('firebase/app');

const ID = require('./requests.json')
const documentID = ID[0]._DOCUMENT_ID_
const initializeFB = async () => {
    // USE YOUR FIREBASE PROJECT SETTINGS:
    //   Firebase Console >> Project Overview >> Apps
    //    >> (select or "Add App" web app) >> Config
    const firebaseConfig = {
      apiKey: "AIzaSyDCH9Uy7Ne_ZRk2B0Gy-E3ZKZG6Oz0BYTc",
      authDomain: "dntmedia-v2.firebaseapp.com",
      projectId: "dntmedia-v2",
      storageBucket: "dntmedia-v2.appspot.com",
      messagingSenderId: "333934549913",
      appId: "1:333934549913:web:7da868584c114a153b5108",
      measurementId: "G-2RPL6H6P2R"
    };
  
    let fbApp = initializeApp(firebaseConfig);
    FIRESTORE = getFirestore(fbApp);
}

const run = async () =>{
    await initializeFB();

    const docRef = doc(FIRESTORE, "requests", documentID);

    deleteDoc(docRef)
    .then(() => {
        console.log("Entire Document has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
})
}
run()
module.exports = {run}