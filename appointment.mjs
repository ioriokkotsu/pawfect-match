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
const sheltersID = urlParams.get("sheltersID");
const auth = getAuth(app);


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is signed in");
  } else {
    window.location.href = './loginpage.html';
  }
})

// Load appointments into the table
async function loadAppointments(filter) {
  const table = document.getElementById("appointmentTable");
  table.innerHTML = "";

  try {
    const shelterRef = doc(db, "shelters", sheltersID);
    const shelterDoc = await getDoc(shelterRef);

    if (shelterDoc.exists()) {
      const shelterData = shelterDoc.data();
      const logoPath = shelterData.shelterLogo;
      const shelterName = shelterData.shelterName;
      document.getElementById(
        "shelterTitle"
      ).innerHTML = `Appointments - ${shelterName}`;
      document.getElementById("orgLogo").src = logoPath;
    } else {
      console.log("error");
    }
  } catch (error) {
    console.error(error);
  }

  try {
    let c;
    if (filter == "All") {
      c = collection(doc(db, "shelters", sheltersID), "appointment");
    } else {
      (c = collection(doc(db, "shelters", sheltersID), "appointment")),
        where("statusAppointment", "==", filter);
    }
    const snapshot = await getDocs(query(c));

    if (snapshot.empty) {
      table.innerHTML = '<tr><td colspan="7>No Appointments Found</td></tr>';
    }

    let index = 0;
    for (const doc of snapshot.docs) {
      const dc = doc.data();
      const docRef = doc.ref;
      //const statusBool = dc.statusAppointment === "Pending";
      index++;
      //const displayNamee = (await getDoc(dc.bookedBy))?.data()?.display_name;
      //const petNamee = (await getDoc(dc.petRef))?.data()?.petName;
      const timestamp = dc.timeSlot.toDate();
      //const displayName = (await getDoc(doc.data().bookedBy))?.data()?.display_name;
      let progress;
      let time;
      const currentDateTime = new Date();
      if (dc.statusAppointment == "Approved") {
        console.log(currentDateTime.getTime());
        console.log(dc.timeSlot.toMillis());
        if (currentDateTime.getTime() > dc.timeSlot.toMillis()) {
          progress = "Done";
        } else {
          const appTime = dc.timeSlot.toMillis();
          const currentTime = currentDateTime.getTime();
          const diffTime = (appTime - currentTime) / (1000 * 60 * 60 * 24);
          console.log(diffTime);
          if (diffTime < 1) {
            const newDiffTime = Math.floor(diffTime * 24);
            progress = `Upcoming in ${newDiffTime} hours`;
          } else {
            const time = Math.floor(diffTime);
            progress = `Upcoming in ${time} day`;
          }
        }
      } else if (dc.statusAppointment == "Pending" || "Canceled") {
        if (currentDateTime.getTime() > dc.timeSlot.toMillis()) {
          progress = "Date has passed";
          await setDoc(docRef, {statusAppointment: "Canceled"}, {merge: true});
        } else {
          progress = "-";
        }
      } else {
        progress = "-";
      }
      console.log(progress);
      table.innerHTML += `
        <tr>
            <td>${index}</td>
            <td>${(await getDoc(dc.bookedBy))?.data()?.display_name}</td>
            <td>${timestamp.getHours()}:00</td>
            <td>${timestamp.getDate()}/${
        timestamp.getMonth() + 1
      }/${timestamp.getFullYear()}</td>
            <td>Tengok ${(await getDoc(dc.petRef))?.data()?.petName}</td>
            <td>${dc.statusAppointment}</td>
            <td>${progress}</td>
            <td>
              ${
                dc.statusAppointment === "Pending"
                  ? `              <button data-id=${doc.id} data-status="Approved" class="btn btn-approve">Approve</button>
              <button data-id=${doc.id} data-status="Rejected" class="btn btn-decline">Decline</button>
              `
                  : `<button class="btn btn-black" disabled>No Action</button>`
              }
            </td>
        </tr>`;
      console.log(doc.id);
      table.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === "BUTTON") {
          const docId = target.getAttribute("data-id");
          const statusApp = {
            statusAppointment: target.getAttribute("data-status"),
          };
          updateStatus(docId, statusApp);
        }
      });
    }
  } catch (error) {
    console.error("Error: ", error);
    table.innerHTML = '<tr><td colspan="7">Failed to load data</td></tr>';
  }
}

// Update Status and Show Notification
async function updateStatus(docId, statusAppointment) {
  try {
    const docRef = doc(
      db,
      `shelters/${sheltersID}/appointment/${docId}`
    );
    await setDoc(docRef, statusAppointment, { merge: true });
    loadAppointments();
  } catch (e) {
    console.error(e);
  }
  window.location.reload();
}

function filterAppointments() {
  const filter = document.getElementById("statusFilter").value;
  loadAppointments(filter);
  console.log(filter);
}
document
  .getElementById("statusFilter")
  .addEventListener("change", filterAppointments);

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
