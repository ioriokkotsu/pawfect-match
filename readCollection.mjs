import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwqdSGNE43oR0uS1a9GTEvQDukNgR5plk",
  authDomain: "pawfect-match-34c4f.firebaseapp.com",
  projectId: "pawfect-match-34c4f",
  storageBucket: "pawfect-match-34c4f.firebasestorage.app",
  messagingSenderId: "801692932561",
  appId: "1:801692932561:web:f0e47e69cfa0800fa528f0",
  measurementId: "G-89RVW9XFDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//const snapshot = await getDocs(collection(db, "pets"));
//const queryShelters = doc(db, "shelters", "LJ4uwOw3KVEiBhi9nDHM");

const snapshot = await getDocs(
  collection(doc(db, "shelters", "LJ4uwOw3KVEiBhi9nDHM"), "appointment")
);
snapshot.forEach(async (doc) => {
  console.log(`Document ID : ${doc.id}`);
  console.log("Data: ", doc.data());
  //
  //const docRef = await getDoc(doc.data().bookedBy);
  //console.log(docRef.data().display_name); //field
  console.log((await getDoc(doc.data().bookedBy))?.data()?.display_name);
  console.log((await getDoc(doc.data().petRef))?.data()?.petName);
  console.log(doc.id);
});
