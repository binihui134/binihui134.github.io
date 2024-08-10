import firebaseConfig from './obfusKeys.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, query, onSnapshot, addDoc, deleteDoc, doc, orderBy } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
      const currentUser = auth.currentUser;
      const messageElement = document.createElement('div');
      messageElement.className = 'message';

      // Check if the message is from the current user
      const isOwnMessage = messageData.userId === currentUser?.uid;

      messageElement.innerHTML = `
        <span>${messageData.username}: ${messageData.message}</span>
        ${isOwnMessage ? `<button class="delete-button" onclick="deleteMessage('${doc.id}')">Delete</button>` : ''}
      `;

      messagesContainer.appendChild(messageElement);
    });

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
}

// Function to send a message
window.sendMessage = () => {
  const messageInput = document.getElementById('message-input');
  const currentUser = auth.currentUser;

  if (currentUser) {
    addDoc(messagesRef, {
      username: currentUser.email.split('@')[0], // Extract username from email
      message: messageInput.value,
      timestamp: new Date(),
      userId: currentUser.uid // Store user ID with the message
    }).then(() => {
      messageInput.value = ''; // Clear input field after sending
    }).catch((error) => {
      console.error('Error adding message: ', error);
    });
  } else {
    console.error('No user is signed in');
  }
}

// Function to delete a message
window.deleteMessage = (messageId) => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    const messageDoc = doc(db, 'messages', messageId);

    // Get the message document
    getDoc(messageDoc).then((docSnap) => {
      if (docSnap.exists()) {
        const messageData = docSnap.data();
        if (messageData.userId === currentUser.uid) {
          // Only allow deletion if the current user is the owner of the message
          deleteDoc(messageDoc).then(() => {
            console.log('Message deleted successfully');
          }).catch((error) => {
            console.error('Error deleting message: ', error);
          });
        } else {
          console.error('User does not have permission to delete this message');
        }
      } else {
        console.error('Message does not exist');
      }
    }).catch((error) => {
      console.error('Error getting message document: ', error);
    });
  } else {
    console.error('No user is signed in');
  }
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

// Call the function to display messages when the page loads
document.addEventListener('DOMContentLoaded', () => {
  displayMessages();
});

window.OpenWindowLogin = () => {
  window.location.href = "login.html";
}
window.OpenWindowRegister = () => {
  window.location.href = "index.html";
}