import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwqdSGNE43oR0uS1a9GTEvQDukNgR5plk",
  authDomain: "pawfect-match-34c4f.firebaseapp.com",
  projectId: "pawfect-match-34c4f",
  storageBucket: "pawfect-match-34c4f.appspot.com",
  messagingSenderId: "801692932561",
  appId: "1:801692932561:web:f0e47e69cfa0800fa528f0",
  measurementId: "G-89RVW9XFDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updatePetIDs() {
  try {
    const petsCollection = collection(db, "pets");
    const snapshot = await getDocs(petsCollection);

    snapshot.forEach(async (docSnapshot) => {
      const docID = docSnapshot.id;
      const petRef = doc(db, "pets", docSnapshot.id);
      const petDocRef = doc(db, "pets", docID);

      await updateDoc(petDocRef, { petID: petRef });
      console.log(`Updated petID for document: ${petRef}`);
    });

    console.log("All documents updated successfully.");
  } catch (error) {
    console.error("Error updating documents: ", error);
  }
}

updatePetIDs();
