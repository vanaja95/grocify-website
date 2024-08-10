// Function to rotate testimonials
function rotateTestimonials() {
    const boxes = document.querySelectorAll('.testimonial-box');
    let index = 0;

    // Hide all testimonials
    function hideAll() {
        boxes.forEach(box => {
            box.style.display = 'none';
        });
    }

    // Show the current testimonial
    function showCurrent() {
        hideAll();
        boxes[index].style.display = 'block';
    }

    // Start rotating
    showCurrent();
    setInterval(() => {
        index = (index + 1) % boxes.length; // Move to the next testimonial
        showCurrent();
    }, 5000); // Change every 5 seconds
}

// Initialize testimonials rotation on page load
document.addEventListener('DOMContentLoaded', rotateTestimonials);

// Handle review form submission
document.getElementById('review-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;

    // Log the data (for demonstration purposes)
    console.log('Review submitted:', { name, text });

    // You would typically send this data to a server here

    // Optionally, clear the form fields
    document.getElementById('review-form').reset();
});