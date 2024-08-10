// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const profilePic = document.getElementById('profile-pic').files[0];
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    // For demonstration purposes, we'll just log the data to the console
    console.log('Profile Picture:', profilePic ? profilePic.name : 'Not selected');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phone);
    console.log('Address:', address);

    // Here, you would typically send this data to the server
    // Example: fetch('/update-profile', { method: 'POST', body: formData });
}


// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Handle profile form submission
    const profileForm = document.querySelector('#profile-info form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleFormSubmit);
    }

    
});
