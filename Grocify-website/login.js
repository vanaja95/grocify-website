// login.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".Login-box form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Here you can add your authentication logic (e.g., AJAX request to a server)

        // For now, we'll assume the login is successful and redirect to the dashboard
        window.location.href ="index.html";
    });
});

