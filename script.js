// Simple login function using local storage

const username = document.getElementById('username');

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (username === storedUsername && password === storedPassword) {
    console.log('Login successful!');
    window.location.href = 'account.html';
    // Redirect or perform other actions
  } else {
    console.log('Invalid credentials');
  }
}

// Simple registration function
function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  console.log('Registration successful!');

  window.location.href = 'login.html'; // Redirect to login page
}

function OpenWindowRegister() {
  window.location.href = 'index.html'; 
}
function OpenWindowLogin() {
  window.location.href = 'login.html';
}

