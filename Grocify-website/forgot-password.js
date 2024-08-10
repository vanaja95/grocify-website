// forgot-password.js

// Example: A simple script to show an alert on form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting
        alert("Password reset link has been sent to your email!");
    });
});
