import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSuZBu0jGhWUTxndwi4AGobd0FIhE0j00",
  authDomain: "loginserver-af1a9.firebaseapp.com",
  projectId: "loginserver-af1a9",
  storageBucket: "loginserver-af1a9.appspot.com",
  messagingSenderId: "978682389438",
  appId: "1:978682389438:web:a88c775a17f21131ac0fef",
  measurementId: "G-1QEY7CFLL8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.register = () => {
  const username = document.getElementById('username').value + "@example.com";
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      console.log('Registration successful!');
      window.location.href = 'login.html'; // Redirect to login page
    })
    .catch((error) => {
      console.error('Error: ', error.message);
    });
}

window.login = () => {
  const username = document.getElementById('username').value + "@example.com";
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      console.log('Login successful!');
      window.location.href = 'account.html'; // Redirect to account page
    })
    .catch((error) => {
      console.error('Error: ', error.message);
    });
}

window.OpenWindowRegister = () => {
  window.location.href = 'index.html'; // Redirect to registration page
}

window.OpenWindowLogin = () => {
  window.location.href = 'login.html'; // Redirect to login page
}

window.Logout = () => {
  window.location.href = "login.html";
}