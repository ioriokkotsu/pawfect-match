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
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
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

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn && !loginBtn.hasListenerAttached) {
        loginBtn.addEventListener("click", () =>{
            console.log("click");
            login();
        });
        loginBtn.hasListenerAttached = true;
    }
})
const email = document.getElementById('email').value;
async function validateEmail(email) {

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
    console.log(regex.test(email));
}
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    validateEmail(email);
    if (!validateEmail(email)) {
        console.log("Please valid email");
        return;
    }

    signInWithEmailAndPassword(auth,email,password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("Logged in as", user.email);

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists() && docSnap.data().roleAdmin === true) {
                window.location.href = "./index.html";
            } else {
                alert("You are not an admin");
                console.log("you are not admin");
            }
        })
        .catch((error) => {
            console.error("Error Logging In:" , error);
            if (error.code === 'auth/invalid-email') {
                alert("Invalid Email");
            } else if (error.code === 'auth/invalid-login-credentials') {
                alert("Wrong Credentials");
            } else {
                alert("An Unknown Error");
            }
        });
}
const form = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
form.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        login();
    }
})
