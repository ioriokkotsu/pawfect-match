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
    window.location.href = './login.html';
  }
})

async function loadAppointments() {
  const table = document.getElementById("tbody_pets");
  table.innerHTML = "";
  try {
    const c = collection(db, "pets");
    const ref = doc(db, `shelters/${petsRef}`);
    //const ref = doc(db, "shelters/MIAR");
    const q = query(c, where("sheltersID", "==", ref));
    const shelterSnap = await getDoc(ref);
    const snapshot = await getDocs(q);

    if (shelterSnap.exists()) {
      const shelterData = shelterSnap.data();
      const logoPath = shelterData.shelterLogo;
      const shelterName = shelterData.shelterName;
      document.getElementById(
        "shelterTitle"
      ).innerHTML = `Appointments - ${shelterName}`;
      document.getElementById("orgLogo").src = logoPath;
    } else {
      console.log("error");
    }

    if (snapshot.empty) {
      table.innerHTML = '<tr><td colspan="7>No Appointments Found</td></tr>';
    }

    let index = 0;
    for (const doc of snapshot.docs) {
      const dc = doc.data();
      //const statusBool = dc.statusAppointment === "Pending";
      index++;
      //const displayNamee = (await getDoc(dc.bookedBy))?.data()?.display_name;
      //const petNamee = (await getDoc(dc.petRef))?.data()?.petName;
      //const displayName = (await getDoc(doc.data().bookedBy))?.data()?.display_name;
      table.innerHTML += `
          <tr>
              <td>${index}</td>
              <td><img src="${dc.photoUrl}" alt="${
        dc.petName
      }" class="img-thumbnail" style="width: 80px; height: 80px;"></td>
              <td>${dc.petName}</td>
              <td>${dc.petSpecies}</td>
              <td>${dc.petBreed}</td>
              <td>${dc.petSize}</td> 
              <td>${dc.livingCondition}</td>
              <td>
                ${
                  dc.availableAdopt === true
                    ? `<button class="btn btn-approve">Available</button>`
                    : `<button class="btn btn-decline">Unavailable</button>`
                }
              </td>
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

async function showEditModal(petId) {
  const docRef = doc(db, `pets/${petId}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const pet = docSnap.data();
    document.getElementById("petId").value = pet.petID;
    document.getElementById("petName").value = pet.petName;
    document.getElementById("petSpecies").value = pet.petSpecies;
    document.getElementById("petBreed").value = pet.petBreed;
    document.getElementById("petSize").value = pet.petSize;
    document.getElementById("livingCondition").value = pet.livingCondition;
    document.getElementById("availableAdopt").value = pet.availableAdopt;
    document.getElementById("photoUrl").value = pet.photoUrl;
    document.getElementById("petModalLabel").innerText = "Edit Pet";
    document.getElementById("save-button").setAttribute("data-id", docSnap.id);
    document.getElementById("save-button").innerText = "Save Data";
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

async function addPetDoc() {
  const ref = doc(db, `shelters/${petsRef}`);
  const petData = {
    petName: document.getElementById("petName").value,
    petSpecies: document.getElementById("petSpecies").value,
    petBreed: document.getElementById("petBreed").value,
    petSize: document.getElementById("petSize").value,
    livingCondition: document.getElementById("livingCondition").value,
    availableAdopt: document.getElementById("availableAdopt").value === "true",
    photoUrl: document.getElementById("photoUrl").value,
    sheltersID: ref,
  };
  try {
    const petColl = collection(db, "pets");
    const petRef = await addDoc(petColl, petData);
    await updateDoc(petRef, {petID: petRef.path});
    console.log(petRef.id);
    alert("Success");
    console.log("SUCCESS");
    loadAppointments();
    bootstrap.Modal.getInstance(document.getElementById("petModal")).hide();
  } catch (e) {
    console.error(e);
  }
}

async function updatePetDoc() {
  const petId = document.getElementById("save-button").getAttribute("data-id");
  const updatedPet = {
    petName: document.getElementById("petName").value,
    petSpecies: document.getElementById("petSpecies").value,
    petBreed: document.getElementById("petBreed").value,
    petSize: document.getElementById("petSize").value,
    livingCondition: document.getElementById("livingCondition").value,
    availableAdopt: document.getElementById("availableAdopt").value === "true",
    photoUrl: document.getElementById("photoUrl").value,
  };

  try {
    const docRef = doc(db, `pets/${petId}`);
    await updateDoc(docRef, updatedPet);
    alert("Success");
    console.log("SUCCESS");
    loadAppointments();
    bootstrap.Modal.getInstance(document.getElementById("petModal")).hide();
  } catch (error) {
    console.error("error:  ", error);
  }
}

const addButton = document.getElementById("add-button");
if (!addButton.hasListenerAttached) {
  addButton.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (target && target.hasAttribute("data-action")) {
      openAddPetModal();
    }
  });
}

function openAddPetModal() {
  console.log("open");
  document.getElementById("petForm").reset();
  document.getElementById("petId").value = "";
  document.getElementById("petName").value = "";
  document.getElementById("petSpecies").value = "";
  document.getElementById("petBreed").value = "";
  document.getElementById("petSize").value = "";
  document.getElementById("livingCondition").value = "";
  document.getElementById("availableAdopt").value = "";
  document.getElementById("photoUrl").value = "";
  document.getElementById("save-button").innerText = "Add New Data";
  document.getElementById("petModalLabel").innerText = "Add New Pet";
  document.getElementById("save-button").setAttribute("data-action", "add");
  console.log(
    document.getElementById("save-button").getAttribute("data-action")
  );
  new bootstrap.Modal(document.getElementById("petModal")).show();
}

function savePet() {
  const form = document.getElementById("petForm");

  if (form.checkValidity() === false) {
    // If form is invalid, prevent submission and show validation feedback
    form.classList.add("was-validated");
    return;
  }

  const petID = document.getElementById("petId").value;
  const pet = {
    petID: petID || `/pets/${Date.now()}`,
    petName: document.getElementById("petName").value,
    petSpecies: document.getElementById("petSpecies").value,
    petBreed: document.getElementById("petBreed").value,
    petSize: parseFloat(document.getElementById("petSize").value),
    livingCondition: document.getElementById("livingCondition").value,
    availableAdopt: document.getElementById("availableAdopt").value
      ? "true"
      : "false",
    //availableAdopt: document.getElementById('availableAdopt').value === 'true',
    photoUrl: document.getElementById("photoUrl").value,
  };

  if (petID) {
    const index = pets.findIndex((p) => p.petID === petID);
    pets[index] = pet;
  } else {
    pets.push(pet);
  }

  loadPets();

  // Close the modal after saving the pet
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("petModal")
  );
  modal.hide();
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
      loginBtn.hasListenerAttached = true;
  }
})
async function logout() {
  signOut(auth)
  .then(() => {
    console.log("User logged out");
    window.location.href = "./login.html";
  })
  .catch((error) => {
    console.error(error);
  })
}