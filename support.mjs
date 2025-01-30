import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
  doc,
  setDoc,
  where,
  query,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-lite.js";

import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwqdSGNE43oR0uS1a9GTEvQDukNgR5plk",
  authDomain: "pawfect-match-34c4f.firebaseapp.com",
  projectId: "pawfect-match-34c4f",
  storageBucket: "pawfect-match-34c4f.firebasestorage.app",
  messagingSenderId: "801692932561",
  appId: "1:801692932561:web:f0e47e69cfa0800fa528f0",
  measurementId: "G-89RVW9XFDT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const urlParams = new URLSearchParams(window.location.search);
const petsRef = urlParams.get("pets");
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is signed in");
  } else {
    window.location.href = './loginpage.html';
  }
})


async function loadAppointments() {
  const table = document.getElementById("tbody_pets");
  table.innerHTML = "";
  try {
    //const ref = doc(db, "shelters/MIAR");
    //const q = query(c, where("sheltersID", "==", ref));
    const q = collection(db, "support_center");
    const snapshot = await getDocs(q);


    if (snapshot.empty) {
      table.innerHTML = '<tr><td colspan="7>No Appointments Found</td></tr>';
    }

    let index = 0;
    for (const doc of snapshot.docs) {
      const dc = doc.data();
      //const statusBool = dc.statusAppointment === "Pending";
      index++;
      console.log(dc.question);
      //const displayNamee = (await getDoc(dc.bookedBy))?.data()?.display_name;
      //const petNamee = (await getDoc(dc.petRef))?.data()?.petName;
      //const displayName = (await getDoc(doc.data().bookedBy))?.data()?.display_name;
      table.innerHTML += `
          <tr>
              <td>${index}</td>
              <td style="text-transform: uppercase;">${dc.question}</td> 
              <td style="text-transform: uppercase;">${dc.answer?dc.answer:"--No Answer Yet--"}</td>
              <td>
              <button data-id=${
                doc.id
              } data-action="editModal" class="btn btn-primary btn-sm btn-custom2"><i class="bi bi-pencil"></i></button>
              <button data-id=${
                doc.id
              } data-action="delete" class="btn btn-danger btn-sm btn-custom2"><i class="bi bi-trash"></i></button></td>
          </tr>`;
      console.log(doc.id);
    }
  } catch (error) {
    console.error("Error: ", error);
    table.innerHTML = '<tr><td colspan="7">Failed to load data</td></tr>';
  }
}

const table = document.getElementById("tbody_pets");
if (!table.hasListenerAttached) {
  table.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (target && target.hasAttribute("data-id")) {
      const docId = target.getAttribute("data-id");
      const docAction = target.getAttribute("data-action");
      if (docAction === "delete") {
        deletePetDoc(docId);
      } else if (docAction === "editModal") {
        showEditModal(docId);
      } else if (docAction === "addModal") {
        openAddPetModal();
        console.log("openn");
      }
    }
  });
  table.hasListenerAttached = true;
}

async function deletePetDoc(docId) {
  try {
    const confirmDel = window.confirm(
      "AAreee you sure you want to delete this pet?"
    );
    if (confirmDel) {
      const docRef = doc(db, `pets/${docId}`);
      console.log(docRef);
      await deleteDoc(docRef);
      loadAppointments();
    }
  } catch (e) {
    console.error(e);
  }
}

async function showEditModal(docId) {
  const docRef = doc(db, `support_center/${docId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const faqs = docSnap.data();
    //document.getElementById("petId").value = pet.petID;
    document.getElementById("question").value = faqs.question;
    document.getElementById("answer").value = faqs.answer;
    document.getElementById("save-button").setAttribute("data-id", docSnap.id);
    document.getElementById("save-button").innerText = "Save Answer";
    new bootstrap.Modal(document.getElementById("petModal")).show();
    console.log(docSnap.id);
  }
}

const saveButton = document.getElementById("save-button");
if (!saveButton.hasListenerAttached) {
  saveButton.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (target && target.hasAttribute("data-id")) {
      const docId = target.getAttribute("data-id");
      updatePetDoc(docId);
    } else if (target && target.hasAttribute("data-action")) {
      console.log(target.getAttribute("data-id"));
      console.log("adddoc");
      addPetDoc();
    }
  });
}



async function updatePetDoc() {
  const docId = document.getElementById("save-button").getAttribute("data-id");
  const updatedFAQ = {
    question: document.getElementById("question").value,
    answer: document.getElementById("answer").value,
  };

  try {
    const docRef = doc(db, `support_center/${docId}`);
    await updateDoc(docRef, updatedFAQ);
    alert("Success");
    console.log("SUCCESS");
    loadAppointments();
    bootstrap.Modal.getInstance(document.getElementById("petModal")).hide();
  } catch (error) {
    console.error("error:  ", error);
  }
}


function loadPets() {
  filterPets(); // Reapply filter when pets are loaded
}

document.addEventListener("DOMContentLoaded", loadAppointments);
////Log Out
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn && !logoutBtn.hasListenerAttached) {
      logoutBtn.addEventListener("click", () =>{
          console.log("click");
          logout();
      });
      logoutBtn.hasListenerAttached = true;
  }
})
async function logout() {
  signOut(auth)
  .then(() => {
    console.log("User logged out");
    window.location.href = "./loginpage.html";
  })
  .catch((error) => {
    console.error(error);
  })
}