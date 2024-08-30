const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToSignInLink = document.getElementById('back-to-sign-in');

// Handle Register button click
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

// Handle Login button click
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Handle Forgot Password link click
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.form-container.sign-in').style.display = 'none';
    document.querySelector('.form-container.sign-up').style.display = 'none';
    document.querySelector('.form-container.forgot-password').style.display = 'block';
});

// Handle Back to Sign In link click
backToSignInLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.form-container.forgot-password').style.display = 'none';
    document.querySelector('.form-container.sign-in').style.display = 'block';
});



//Connect the Sign-Up Form to the Backend

document.querySelector('.sign-up form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.querySelector('.sign-up input[type="text"]').value;
    const email = document.querySelector('.sign-up input[type="email"]').value;
    const password = document.querySelector('.sign-up input[type="password"]').value;
    
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: name,
            email: email,
            password: password
        }),
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('User registered successfully');
              // Redirect to login page or update the UI
          } else {
              alert(data.message);
          }
      }).catch(error => {
          console.error('Error:', error);
      });
});



//Connect the Login Form to the Backend

document.querySelector('.sign-in form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.querySelector('.sign-in input[type="email"]').value;
    const password = document.querySelector('.sign-in input[type="password"]').value;
    
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Login successful');
              // Store user info in localStorage, or redirect to a different page
          } else {
              alert(data.message);
          }
      }).catch(error => {
          console.error('Error:', error);
      });
});


// Connect the Forgot Password Form to the Backend

document.querySelector('.forgot-password form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.querySelector('.forgot-password input[type="email"]').value;
    
    fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email
        }),
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Password reset link sent to your email');
              // Optionally redirect to login page
          } else {
              alert(data.message);
          }
      }).catch(error => {
          console.error('Error:', error);
      });
});




