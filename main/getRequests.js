const {initializeApp} = require('firebase/app');
const {
  getDocs,
  addDoc,
  collection,
  connectFirestoreEmulator,
  getFirestore,
  writeBatch
} = require('firebase/firestore');
const {getAuth, signInWithEmailAndPassword} = require('firebase/auth');
const fs = require('fs');

let FIRESTORE;
let AUTH;

// Firebase Console >> Authentication
const USER1 = {
  email: 'michael.pigottbiz@gmail.com', // USER THAT EXISTS IN FIREBASE AUTH
  password: 'thisistest',
  uid: 'rbYnRyXnCkSlTFcda7qGyKmri2T2'
};

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

  let USING_FIREBASE_EMULATOR = false;
  if (USING_FIREBASE_EMULATOR) {
    // I explicitly set "host" and "port" in firebase.json so that devices
    // on my local network can access the emulator:
    //        "emulators": {
    //          "functions": {
    //            "port": 5001,
    //            "host": "192.168.1.53"
    //          },
    //          "firestore": {
    //            "port": 5002,
    //            "host": "192.168.1.53"
    //          },
    //       ...
    //
    connectFirestoreEmulator(FIRESTORE, '192.168.1.53', 5002);
  }

  try {
    AUTH = getAuth();
    await signInWithEmailAndPassword(AUTH, USER1.email, USER1.password);
    let currUser = AUTH.currentUser;
    console.log(`Logged in with USER1 uid(${currUser.uid})`);
  } catch (ex) {
    console.error(ex.message);
    throw ex;
  }
};

const die = (msg) => {
  console.error(msg);
  process.exit(1);
};

const getDocuments = async (collectionName) => {
  let retVal = [];

  try {
    let collectionRef = collection(FIRESTORE, collectionName);
    let querySnap = await getDocs(collectionRef);
    for (let i = 0; i < querySnap.size; i++) {
      retVal.push({
        _DOCUMENT_ID_: querySnap.docs[i].id,
        ...querySnap.docs[i].data()
      });
    }
  } catch (ex) {
    die(`ERROR getDocuments():: ${ex.message}`);
  }

  return retVal;
};
const main = async () => {
  console.log('>>> START LOADING Users - ', Date());

  await initializeFB();

  let collectionName = 'requests';
  let allDocs = await getDocuments(collectionName);

  let jsonFile = `./main/${collectionName}.json`;
  
  fs.writeFileSync(jsonFile, JSON.stringify(allDocs, null, 2), (err) => {
    if (err) {
      die(`EXCEPTION while writing JSON file: ${err.message}`);
    }
    console.log(`JSON data saved to (${jsonFile})`);
  });

  console.log('>>> DONE - output written to:', jsonFile);
  process.exit();
};

main().catch((ex) => {
  die('main() caught an exception: ' + ex.message);
});