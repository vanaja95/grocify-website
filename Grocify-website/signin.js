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


