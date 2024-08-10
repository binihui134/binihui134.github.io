import firebaseConfig from './obfusKeys.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, query, onSnapshot, addDoc, orderBy } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Reference to the chat messages collection
const messagesRef = collection(db, 'messages');

// Function to display chat messages
function displayMessages() {
  const messagesContainer = document.getElementById('messages-container');

  // Create a query to get all messages ordered by timestamp
  const messagesQuery = query(messagesRef, orderBy('timestamp'));

  // Listen to changes in the messages collection
  onSnapshot(messagesQuery, (querySnapshot) => {
    messagesContainer.innerHTML = ''; // Clear existing messages
    querySnapshot.forEach((doc) => {
      const messageData = doc.data();
      const messageElement = document.createElement('div');
      messageElement.textContent = `${messageData.username}: ${messageData.message}`;
      messagesContainer.appendChild(messageElement);
    });

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
}

// Call the function to display messages when the page loads
document.addEventListener('DOMContentLoaded', () => {
  displayMessages();
});

// Function to send a message
window.sendMessage = () => {
  const messageInput = document.getElementById('message-input');
  const username = localStorage.getItem('username') || 'Anonymous';

  addDoc(messagesRef, {
    username: username,
    message: messageInput.value,
    timestamp: new Date()
  }).then(() => {
    messageInput.value = ''; // Clear input field after sending
  }).catch((error) => {
    console.error('Error adding message: ', error);
  });
}

// Registration function for user
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

// Login function for user
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
      document.getElementById('error-message').textContent = "Invalid username or password!";
      document.getElementById('error-message').classList.remove('hidden');
    });
}

// Function to open settings window
window.OpenWindowSettings = () => {
  window.location.href = 'settings.html'; // Redirect to settings page
}

// Function to sign out
window.signOut = () => {
  auth.signOut().then(() => {
    window.location.href = 'login.html'; // Redirect to login page
  }).catch((error) => {
    console.error('Error signing out: ', error);
  });
}