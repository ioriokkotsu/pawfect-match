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
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

//import {Chart} from 'https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js';
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
const auth = getAuth(app);


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is signed in");
  } else {
    window.location.href = './loginpage.html';
  }
})
////Main Data (Shelters)
const shelters = [
  { id: "PAWS", elementId: "appointment1-count" , path:"shelters/PAWS", elementIdx: "adoption1-count"},
  { id: "SPCA", elementId: "appointment2-count" , path:"shelters/SPCA" , elementIdx: "adoption2-count"}, 
  { id: "MIAR", elementId: "appointment3-count" , path:"shelters/MIAR", elementIdx: "adoption3-count"},
  { id: "HAVEN", elementId: "appointment4-count" , path:"shelters/HAVEN", elementIdx: "adoption4-count"},
];

//Appointment Start
async function countPendingAppointments() {
  for (const shelter of shelters) {
    try {
      const q = query(
        collection(doc(db, "shelters", shelter.id), "appointment"),
        where("statusAppointment", "==", "Pending")
      );

      const snapshot = await getDocs(q);
      const count = snapshot.size;
      console.log(shelter.id,"Pending" ,snapshot.size);

      // Update the respective HTML element
      document.getElementById(shelter.elementId).textContent = count;
    } catch (error) {
      console.error(`Error counting for shelter ${shelter.id}: `, error);
      document.getElementById(shelter.elementId).textContent = "Error";
    }
  }
}
document.addEventListener("DOMContentLoaded", countPendingAppointments);

//Appointment End
////
async function countAdoption() {
  for (const shelter of shelters) {
    try {
      const Ref = doc(db, shelter.path);
      const q = query(
        collection(db, "pets"),
        where("sheltersID", "==", Ref),
        where("availableAdopt", "==", false)
      );

      const snapshot = await getDocs(q);
      const count = snapshot.size;
      console.log(shelter.id,"Adopted" ,snapshot.size);

      // Update the respective HTML element
      document.getElementById(shelter.elementIdx).textContent = count;
    } catch (error) {
      console.error(`Error counting for shelter ${shelter.id}: `, error);
      document.getElementById(shelter.elementIdx).textContent = "Error";
    }
  }
}

////
var dogsCatsAdoptionData = {
  labels: ["PAWS", "SPCA Selangor", "MIAR", "My Pets Haven"],
  datasets: [
    {
      label: "Dogs",
      data: [], // Example data for dogs adoption
      backgroundColor: "#b49285",
      borderColor: "#b49285",
      borderWidth: 1,
    },
    {
      label: "Cats",
      data: [], // Example data for cats adoption
      backgroundColor: "#ffd9dd",
      borderColor: "#ffd9dd",
      borderWidth: 1,
    },
  ],
};

// Options for better readability
var adoptionChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      stacked: true, // Stacked bars for better comparison
    },
    y: {
      stacked: true,
      beginAtZero: true,
      title: {
        display: true,
        text: "Number of Adoptions",
      },
    },
  },
};
// Options for Appointments Chart
const appointmentsOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};


async function countChartPets() {
  if (window.isCountingPets) {
    console.warn("countChartPets running");
    return;
  }
  window.isCountingPets = true;
  const countsD = [];
  const countsC = [];
  for (const shelter of shelters) {
    try {
      const Ref = doc(db, shelter.path);

      const qCat = query(
        collection(db, "pets"),
        where("petSpecies", "==", "Cat"),
        where("sheltersID", "==", Ref)
      );
      const qDog = query(
        collection(db, "pets"),
        where("petSpecies", "==", "Dog"),
        where("sheltersID", "==", Ref)
      );

      const snapshotC = await getDocs(qCat);
      const snapshotD = await getDocs(qDog);
      countsD.push(snapshotD.size);
      countsC.push(snapshotC.size);

      // Update the respective HTML element
    } catch (error) {
      console.error(`Error counting for shelter ${shelter.id}: `, error);
    }
  }
  dogsCatsAdoptionData.datasets[0].data = countsD;
  console.log("Dogs Data ", dogsCatsAdoptionData.datasets[0].data);
  dogsCatsAdoptionData.datasets[1].data = countsC;
  console.log("Cats Data ",dogsCatsAdoptionData.datasets[1].data);
  updateChart(
    "dogsCatsAdoptionChart",
    dogsCatsAdoptionData,
    adoptionChartOptions,
    dogsCatsAdoptionChart
  );
  window.isCountingPets = false;
}
////Adoption Dogs Cats



////Appointment Chart Start
const appointmentData = {
  labels: ["PAWS", "SPCA Selangor", "MIAR", "My Pets Haven"],
  datasets: [
    {
      label: "Pets", // This label is part of the legend, but we hide it in the options
      data: [],
      //backgroundColor: ["#8D6E63", "#E4D294", "#808080", "#FFC0C7"], // Updated colors
      backgroundColor: ["#8D6E63", "#E4D294", "#808080", "#FFC0C7"],
    },
  ],
};

// Options for Appointments Chart
const appointmentOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
async function countChartAppointments() {
  const counts = [];
  for (const shelter of shelters) {
    try {

      const q = query(
        collection(doc(db, "shelters", shelter.id), "appointment")
      );

      const snapshot = await getDocs(q);
      const count = snapshot.size;
      console.log(shelter.id, "Appointment",count);
      counts.push(count);

      // Update the respective HTML element
    } catch (error) {
      console.error(`Error counting for shelter ${shelter.id}: `, error);
    }
  }
  appointmentData.datasets[0].data = counts;
  console.log("data appointment ",appointmentData.datasets[0].data);
  updateChart(
  "appointmentsChart", appointmentData, appointmentOptions, appointmentsChart
  );
}
////Appointment Chart End



// Render the Dogs and Cats Adoption Stats Chart
let dogsCatsAdoptionChart;
let appointmentsChart;

function updateChart(chartId, chartData, chartOptions, chartInstance) {
  const canvas = document.getElementById(chartId);
  if (!canvas) {
    console.error("Canvas element not found for:", chartId);
    return;
  }
  const ctx = canvas.getContext("2d");
  // Destroy Instance
  if (chartInstance) {
    console.log(`Destroying existing chart instance for ${chartId}`);
    chartInstance.destroy();
  }
  // New Chart
  return new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });

}
document.addEventListener("DOMContentLoaded", () => {
  dogsCatsAdoptionChart = updateChart(
    "dogsCatsAdoptionChart",
    dogsCatsAdoptionData,
    adoptionChartOptions,
    dogsCatsAdoptionChart
  );
  appointmentsChart = updateChart(
    "appointmentsChart",
    appointmentData,
    appointmentOptions,
    appointmentsChart
  );

  countChartAppointments();
  countChartPets();
});
document.addEventListener("DOMContentLoaded", () => {
  countPendingAppointments();
  countAdoption();
});

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