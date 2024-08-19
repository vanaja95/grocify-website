document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;

    // You can save the data to a database here or use localStorage for a simple demo
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileEmail', email);
    localStorage.setItem('profilePhone', phone);
    localStorage.setItem('profileLocation', location);

    // Redirect back to profile page
    window.location.href = 'profile.html';
});
