import firebaseConfig from './obfusKeys.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function showError(message) {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    errorElement.classList.add('show');

    // Hide the message after 3 seconds
    setTimeout(() => {
      errorElement.classList.remove('show');
      // Ensure the text disappears completely after the transition
      setTimeout(() => {
        errorElement.classList.add('hidden');
      }, 500); // This should match the duration of the CSS transition
    }, 3000); // Adjust time as needed
  }
}

function validateFields(username, password) {
  if (!username || !password) {
    showError('Fill in the fields');
    return false;
  }
  return true;
}

window.register = () => {
  const username = document.getElementById('username').value + "@example.com";
  const password = document.getElementById('password').value;

  if (!validateFields(username, password)) {
    return;
  }

  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      console.log('Registration successful!');
      window.location.href = 'login.html'; // Redirect to login page
    })
    .catch((error) => {
      showError('This username is in use!');
      console.error('Error: ', error.message);
    });
}

window.login = () => {
  const username = document.getElementById('username').value + "@example.com";
  const password = document.getElementById('password').value;

  if (!validateFields(username, password)) {
    return;
  }

  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      console.log('Login successful!');
      window.location.href = 'account.html'; // Redirect to account page
    })
    .catch((error) => {
      showError('This username/password is invalid');
      console.error('Error: ', error.message);
    });
}

window.OpenWindowRegister = () => {
  window.location.href = 'index.html'; // Redirect to registration page
}

window.OpenWindowLogin = () => {
  window.location.href = 'login.html'; // Redirect to login page
}
window.SignOut = () => {
  window.location.href = 'login.html'; // Redirect to login page
}
